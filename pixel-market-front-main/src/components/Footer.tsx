const Footer = () => {
  const columns = [
    { title: 'Get to Know Us', links: ['About Us', 'Careers', 'Press Releases', 'Amazon Science'] },
    { title: 'Make Money with Us', links: ['Sell on Amazon', 'Sell under Amazon Accelerator', 'Protect and Build Your Brand', 'Amazon Global Selling'] },
    { title: 'Amazon Payment Products', links: ['Amazon Business Card', 'Shop with Points', 'Reload Your Balance', 'Amazon Currency Converter'] },
    { title: 'Let Us Help You', links: ['COVID-19 and Amazon', 'Your Account', 'Returns Centre', 'Recalls and Product Safety Alerts'] },
  ];

  return (
    <footer className="bg-footer-bg text-footer-foreground">
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full bg-secondary-nav text-secondary-nav-foreground text-sm py-3 hover:bg-secondary-nav/80 transition-colors">
        Back to top
      </button>
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="font-bold text-navbar-foreground mb-3">{col.title}</h3>
            <ul className="space-y-2 text-sm">
              {col.links.map((link) => (
                <li key={link} className="hover:underline cursor-pointer">{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-footer-foreground/20 py-4 text-center text-xs">
        © 2024 Amazon Clone — Educational Project
      </div>
    </footer>
  );
};

export default Footer;
