import { useState } from 'react';
import { FaBolt, FaBars, FaTimes } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import logo from '../../assets/Images/logo.png';
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Blog', href: '#blog' },
        { name: 'Fund', href: '#fund' },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleLogout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userName');
  localStorage.removeItem('userRoll');
  window.location.href = '/login';
};


    return (
        <header className="relative bg-gradient-to-r from-[#2596be] to-[#2a3e97] shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-2">
                        {/* <img src={logo} alt="Logo" width={80}
						height={80} /> */}
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {menuItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-white hover:text-white/80 transition-colors duration-300 font-medium relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                        <Button
                            variant="outline"
                            className="bg-transparent border-white text-white hover:bg-white hover:text-[#d03e27] transition-all duration-300 font-medium"
                        >
                            Payment
                        </Button>
                        <Button onClick={handleLogout}
                            variant="outline"
                            className="bg-transparent border-white text-white hover:bg-white hover:text-[#d03e27] transition-all duration-300 font-medium"
                        >
                            Logout
                        </Button>

                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 rounded-lg bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300"
                    >
                        {isMenuOpen ? (
                            <FaTimes className="w-6 h-6" />
                        ) : (
                            <FaBars className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <nav className="py-4 space-y-2">
                        {menuItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors duration-300 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                        <div className="px-4 pt-2">
                            <Button
                                variant="outline"
                                className="w-full bg-transparent border-white text-white hover:bg-white hover:text-[#d03e27] transition-all duration-300 font-medium"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Payment
                            </Button>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
