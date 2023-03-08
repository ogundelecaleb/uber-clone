import styles from "../styles/Home.module.css";
import tw from "tailwind-styled-components";
import Map from "./components/Map";
import Link from "next/link";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName,
          photoUrl: user.photoUrl,
        });
      } else {
        setUser(null);
        router.push("/login");
      }
      console.log(user.photoUrl)
    });
  }, []);
  return (
    <Wrapper>
      <Map />
      <ActionItems>
        <Header>
          <Logo src="./kride.png"></Logo>

          <Profile>
            <Name>{user && user.name}</Name>
            <UserImage src={user && user.photoURL} 
            onClick={() => signOut(auth)}/>
          </Profile>
        </Header>
        <ActionButtons>
          <Link href="/search">
            <ActionButton>
              <ActionButtionImage src="https://i.ibb.co/cyvcpfF/uberx.png" />
              Ride
            </ActionButton>
          </Link>
          <Link href="">
            <ActionButton>
              <ActionButtionImage src="https://i.ibb.co/n776JLm/bike.png" />
              Wheel
            </ActionButton>
          </Link>
          <Link href="">
            <ActionButton>
              <ActionButtionImage src="https://i.ibb.co/5RjchBg/uberschedule.png" />
              Reserve
            </ActionButton>
          </Link>
        </ActionButtons>
        <InpuButton>Where to?</InpuButton>
      </ActionItems>
    </Wrapper>
  );
}

const Wrapper = tw.div`
flex flex-col bg-blue-400 h-screen
`;
const ActionItems = tw.div`
flex-1 p-4
`;
const Header = tw.div`
flex justify-between items-center `;

const Logo = tw.img`
h-28 w-28`;

const Profile = tw.div`
flex items-center 
`;
const Name = tw.div`
mr-4 w-20`;

const UserImage = tw.img`
h-12 w-12 rounded-full border-gray-300 p-px cursor-pointer
`;

const ActionButtons = tw.div`
flex items-center justify-between
`;
const ActionButton = tw.div`
bg-gray-200 flex-1 p-2  h-38 flex items-center flex-col m-1 justify-center rounded-lg transform hover:scale-105 transition text-xl
`;

const ActionButtionImage = tw.img`
h-3/5 `;

const InpuButton = tw.div`
h-20 bg-gray-200 text-2xl p-4 flex items-center mt-8 rounded-lg
`;
