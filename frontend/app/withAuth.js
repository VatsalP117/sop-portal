"use client"

import React,{useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';

const checkAuthentication = async (setUsername) => {
    // Check if the user is authenticated
    try {
        const token = localStorage.getItem('token');
        if(!token) {
            return false;
        }
        const response = await fetch('/api/auth/isloggedin', {
            method: 'GET',
            headers: {
                'Authorization': JSON.stringify(token),
            },
            withCredentials: true,
        })
        if(response.status === 200) {
            const {username} = await response.json();
            setUsername(username);
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};

const withAuth = (WrappedComponent) => {
    const AuthComponent = (props) => {
        const [loading, setLoading] = useState(true);
        const [username, setUsername] = useState('');

        const router = useRouter();

        useEffect(() => {
            checkAuthentication(setUsername).then((isAuthenticated) => {
                if(!isAuthenticated) {
                    router.push('/login');
                } else {
                    setLoading(false);
                }
            }).catch((err) => {
                router.push('/login');
            });
        },[]);

        if(loading) {
            return <Card className="h-[100vh] flex items-center justify-center text-5xl">Loading...</Card>
        }

        return <WrappedComponent {...props} username={username}/>
    };
    return AuthComponent;
};

export default withAuth;