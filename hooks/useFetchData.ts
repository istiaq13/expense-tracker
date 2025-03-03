import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firestore } from '@/config/firebase';
import { collection, onSnapshot, query, QueryConstraint } from 'firebase/firestore';

const useFetchData = <T> (
    collectionName: string,
    constraints: QueryConstraint[] = []
) => {

    const [data, setData] = useState<T[]>([])
    const [ loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        if(!collectionName) return;
        const collectionRef = collection(firestore, collectionName);
        const q = query(collectionRef, ...constraints);

        const unsub = onSnapshot(q, (snapshot)=>{
            const fetchcedData = snapshot.docs.map(doc=>{
                return {
                    id: doc.id,
                    ...doc.data()
                };
            }) as T[];
            setData(fetchcedData);
            setLoading(false);
        },(err)=>{
            console.log('Errpr fetchong data: ',err);
            setError(err.message);
            setLoading(false);
        });

        return ()=> unsub();
    },[])

  return { data, loading, error };
};

export default useFetchData;

const styles = StyleSheet.create({})