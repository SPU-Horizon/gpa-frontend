// import React from 'react';

// const Footer: React.FC = () => {
//     return (
//         <footer>
//             <div className="mt-auto flex justify-between items-center p-4 bg-gray-900 text-white">
//                 <div>
//                     <p>&copy; 2024</p>
//                 </div>
//                 <div>
//                     <p>Privacy Policy</p>
//                 </div>
//             </div>
//         </footer>
//     );
// };


// Footer.tsx
import React from "react";

function Footer() {
  return (
    <footer className="p-4 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <div>
            <p>&copy;GPA 2024</p>
        </div>
        <div>
            <p>Privacy Policy</p>
        </div>
    </footer>
  );
}

export default Footer;

