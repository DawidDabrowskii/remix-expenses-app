import MainHeader from "../components/navigation/MainHeader";

import sharedStyles from "../styles/shared.css?url";

type MainLayoutProps = {
  children: React.ReactNode;
  id?: string;
};

export function MainLayout({ children, id }: MainLayoutProps) {
  return (
    <>
      <MainHeader />
      <main id={id}>{children}</main>
    </>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: sharedStyles }];
}
