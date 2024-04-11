"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function VerifyPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const verifyEmail = async () => {
    try {
      const resposne = await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];

    setToken(urlToken || " ");
  }, [token]);

  // -- Good Practice
  //   useEffect(() => {
  //     const { query } = router;

  //     const urlToken = query.token;
  //     setToken(urlToken)
  //   }, [token, router]);

  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>

      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
}
