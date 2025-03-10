import { firestore } from "@/config/firebase";
import { ResponseType, TransactionType, WalletType } from "@/types";
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { uploadFileToCloudinary } from "./imageService";

export const createOrUpdateTransaction = async (
    transactionData: Partial<TransactionType>
): Promise<ResponseType> => {
    try {
        const { id, type, walletId, amount, image } = transactionData;
        if (!amount || amount <= 0 || !walletId || !type) {
            return { success: false, msg: "Invalid Data" };
        }

        if (id) {
            const transactionRef = doc(firestore, "transactions", id);
            await setDoc(transactionRef, transactionData, { merge: true });
            return {
                success: true,
                data: { ...transactionData, id: transactionRef.id },
            };
        } else {
            let res = await updateWalletForNewTransaction(walletId!, Number(amount), type);

            if (!res.success) return res;

            if (image) {
                const imageUploadRes = await uploadFileToCloudinary(image, "transactions");
                if (!imageUploadRes.success) {
                    return {
                        success: false,
                        msg: imageUploadRes.msg || "Failed to upload image",
                    };
                }
                transactionData.image = imageUploadRes.data;
            }

            const transactionRef = doc(collection(firestore, "transactions"));
            await setDoc(transactionRef, transactionData, { merge: true });

            return {
                success: true,
                data: { ...transactionData, id: transactionRef.id },
            };
        }
    } catch (err: any) {
        console.log("error creating or updating transaction: ", err);
        return { success: false, msg: err.message };
    }
};

const updateWalletForNewTransaction = async (
    walletId: string,
    amount: number,
    type: string
) => {
    try {
        const walletRef = doc(firestore, "wallets", walletId);
        const walletSnapshot = await getDoc(walletRef);
        if (!walletSnapshot.exists()) {
            return { success: false, msg: "Wallet not found" };
        }

        const walletData = walletSnapshot.data() as WalletType;

        if (type === "expense" && Number(walletData.amount) - amount < 0) {
            return { success: false, msg: "Selected wallet doesn't have enough balance" };
        }

        const updateType = type === "income" ? "totalIncome" : "totalExpenses";
        const updatedWalletAmount =
            type === "income"
                ? Number(walletData.amount) + amount
                : Number(walletData.amount) - amount;

        const updatedTotals =
            type === "income"
                ? Number(walletData.totalIncome || 0) + amount
                : Number(walletData.totalExpenses || 0) + amount;

        await updateDoc(walletRef, {
            amount: updatedWalletAmount,
            [updateType]: updatedTotals,
        });

        return { success: true };
    } catch (err: any) {
        console.log("error updating wallet for new transaction: ", err);
        return { success: false, msg: err.message };
    }
};

export default { createOrUpdateTransaction };
