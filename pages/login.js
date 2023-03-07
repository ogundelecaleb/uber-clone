import React from "react";
import tw from "tailwind-styled-components";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase";
// https://i.ibb.co/ZMhy8ws/uber-logo.png
const Login = () => {
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
  }, []);
  return (
    <Wrapper>
      <UberLogo src="./kride.png" />
      <Tittle>Log in to access your account</Tittle>
      <HeadImage src="https://i.ibb.co/CsV9RYZ/login-image.png" />
      <SignInButton onClick={() => signInWithPopup(auth, provider)}>
        Sign in with Google
      </SignInButton>
      <DesignedBy>Designed by Ogundele Caleb</DesignedBy>
    </Wrapper>
  );
};

export default Login;

const Wrapper = tw.div`
flex flex-col h-screen bg-gray-200 p-4
`;

const SignInButton = tw.button`
bg-black text-white text-center py-4 mt-8 self-center w-full `;

const UberLogo = tw.img`
h-20 w-25  object-contain self-start
`;

const Tittle = tw.div`
text-5xl pt-4 text-gray-500
`;

const HeadImage = tw.img`
`;

const DesignedBy = tw.div`
absolute bottom-0 right-0 pr-4 pb-3 text-gray-500
`;
