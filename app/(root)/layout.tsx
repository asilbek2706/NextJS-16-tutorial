import { ReactNode } from 'react';

const Layout = ({children}:{children: ReactNode}) => {
    return (
        <div>
            <p>Navbar</p>
            {children}
            <p>Footer</p>
        </div>
    );
};

export default Layout;