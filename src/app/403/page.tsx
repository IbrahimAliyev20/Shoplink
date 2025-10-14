import React from 'react';
import { Metadata } from "next";
import { ERROR_403_META } from "@/utils/MetaTagsData";

export const metadata: Metadata = {
  title: ERROR_403_META.title,
  description: ERROR_403_META.meta_description,
  keywords: ERROR_403_META.meta_keywords,
};

const ForbiddenPage = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: '#f8d7da',
      color: '#721c24',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '10px' }}>403</h1>
      <h2>Giriş Qadağandır</h2>
      <p>Sizin bu səhifəyə daxil olmaq üçün icazəniz yoxdur.</p>
    </div>
  );
};

export default ForbiddenPage;