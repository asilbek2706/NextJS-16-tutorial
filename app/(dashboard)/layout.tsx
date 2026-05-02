import { ReactNode } from 'react';

const Layout = ({children}: {children: ReactNode}) => {
    return (
        <div>
            <p>Dashboard Navbar</p>
            {children}
        </div>
    );
};

export default Layout;