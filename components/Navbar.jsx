import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import Logout from "./auth/Logout";

const Navbar = async ({ sideMenu }) => {
    const session = await auth();
    console.log(session);
    return (
        <nav>
            <Link href="/">
                <Image
                    src="/nav-logo.png"
                    alt="Stay Swift Logo"
                    width={200}
                    height={200}
                />
            </Link>
            {sideMenu && (
                <ul>
                    <li>
                        <Link href="#">Recommended Places</Link>
                    </li>

                  

                    <li>
                        <Link href="#">Contact us</Link>
                    </li>

                    <li>
                        <Link href="/bookings">Bookings</Link>
                    </li>

                    <li>
                        {
                            session?.user ? (
                                <idiv className="flex items-center gap-2">
                                    <span className="flex justify-center items-center">
                                    <span className="mx-1"> {session?.user?.name} </span>
                                    
                                    <Image
                                        src={session?.user?.image}
                                        alt={session?.user?.name}
                                        className="rounded-full h-10 w-10"
                                        width={32}
                                        height={22}/>
                                    </span>
                                  
                                    <span> | </span>
                                    <Logout />
                                </idiv>
                            ) : ( <Link href="/login" className="login">
                            Login
                        </Link>)
                        }

                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;