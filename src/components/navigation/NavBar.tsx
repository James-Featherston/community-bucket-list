import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { TypographyH1 } from "../typography/h1";
import Link from "next/link";
import { TypographyH3 } from "../typography/h3";

const NavBar = () => {
  return (
    <nav className="w-screen fixed h-16 top-0 left-0 bg-white/70 backdrop-blur-md flex items-center  p-4 px-6 border-b-2 shadow-lg">
      <TypographyH1>BucketList</TypographyH1>
      <div className="grow-1" />
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem className="px-4 py-2">
            <NavigationMenuLink asChild>
              <Link href="/">
                <TypographyH3>Home</TypographyH3>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <TypographyH3>Explore</TypographyH3>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white">
              <ul>
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/explore">Explore</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/friends-list">Friends Lists</Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <TypographyH3>Bucket List</TypographyH3>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white">
              <ul>
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/my-bucket-list">My Bucket List</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/my-completed-items">Completed Items</Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="px-4 py-2">
            <NavigationMenuLink asChild>
              <Link href="/profile">
                <TypographyH3>Profile</TypographyH3>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default NavBar;
