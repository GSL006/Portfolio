export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Skills", link: "#Skills" },
  { name: "CV/Resume", link: "#resume" },
];

export const gridItems = [
  {
    id: 1,
    title: "Dedicated to clear communication and effective collaboration",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "Adaptable and responsive to evolving project needs",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My skill set",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Working on a trasformer based method for stock price and trend prediction instead of traditional ML models.",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "Stock Analyser + Predictor",
    des: "Developed a stock prediction model using news data from Alpaca API and historical data from Yfinance. Achieved 89.06% accuracy with a Feedforward Neural Network, deployed in a Streamlit app for real-time stock price forecasts. Project results are documented in an upcoming research paper.",
    img: "/stock.png",
    iconLists: ["https://upload.wikimedia.org/wikipedia/commons/2/20/Tensorflow-svgrepo-com.svg", "https://upload.wikimedia.org/wikipedia/commons/2/22/Pandas_mark.svg", "https://upload.wikimedia.org/wikipedia/commons/6/67/Numpy-svgrepo-com.svg", "https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/files/python-logo-only.svg", "/stream.svg"],
    link: "https://github.com/GSL006/Stock-Predictor",
  },
  {
    id: 2,
    title: "E-Commerce Website",
    des: "Built with Next.js as the backend, Sanity for database management, and Stripe for payments and shipping. Utilizes file-based routing and data fetching methods like getServerSideProps, getStaticPaths, and getStaticProps for optimized server-side rendering and static generation. Future enhancements include integrating real payment gateways and expanding product pages..",
    img: "/ecom.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "https://upload.wikimedia.org/wikipedia/commons/9/95/Sanity-square-logo.png", "/stripe.svg"],
    link: "https://github.com/GSL006/E-commerce",
  },
  {
    id: 3,
    title: "Location Based Reminder",
    des: "Developed a web app that triggers reminders based on user location. Users set reminders with title, description, and coordinates, receiving email alerts when within 100 meters. Built with HTML, CSS, JavaScript, Leaflet.js for mapping, jQuery for interactivity, and Go for backend. Future updates may include Google's API for more accurate coordinates.",
    img: "/go.png",
    iconLists: ["https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg", "/js.svg", "/jq.svg", "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg", "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg"],
    link: "https://github.com/GSL006/Location-Based-Reminder",
  },
  {
    id: 4,
    title: "DriveIO",
    des: "The platform is a car rental solution where users sign up as owners to rent out cars or as customers to book them. Built with Next.js, MySQL, Node.js, and Express.js, it features secure Firebase authentication and PayPal integration for payments, offering a smooth, user-friendly, and efficient experience for all.",
    img: "/driveio.png",
    iconLists: ["/next.svg", "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg", "/sql.svg", "/firebase.svg", "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"],
    link: "https://github.com/GSL006/DriveIO",
  },
];

export const Skills = [
  {
    name: "Python",
    quote:
      "Known for its versatility and ease of use, Python is ideal for data analysis, machine learning, web development, automation, and scripting. Its extensive libraries, like NumPy, Pandas, and TensorFlow, enhance its capabilities in various fields.",
    img: "https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/files/python-logo-only.svg",
  },
  {
    name: "Java",
    quote: "A robust, object-oriented language used extensively in enterprise environments, Android app development, and backend services. Java's strong memory management, portability, and scalability make it suitable for large-scale applications.",
    img: "/java-icon.svg"
  },
  {
    name: "C/C++",
    quote: "Provides low-level access to memory and system resources, which is critical for performance-intensive applications such as operating systems, game development, and high-frequency trading systems. C++ builds on C with object-oriented features and enhanced abstraction.",
    img: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg"
  },
  {
    name: "SQL",
    quote: "Essential for database management, SQL enables users to efficiently query, update, and manage relational databases. It supports complex queries, transactions, and data manipulation, making it vital for backend development and data analytics.",
    img: "/sql.svg"
  },
  {
    name: "JS",
    quote: "A core technology for web development, JavaScript enables interactive elements on web pages, such as animations, dynamic content updates, and client-side validation. It's essential for modern web development frameworks and libraries.",
    img: "/js.svg"
  },
  {
    name: "R",
    quote: " Specialized for statistical analysis and graphical representation, R is commonly used in data science, research, and academia. It offers a wide range of statistical and data manipulation packages.",
    img: "https://upload.wikimedia.org/wikipedia/commons/1/1b/R_logo.svg",
  },
  {
    name: "Go",
    quote: "Known for its simplicity and efficiency, Go is used in building scalable web servers, distributed systems, and cloud services. Its strong concurrency support and performance make it a popular choice for backend development.",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg",
  },
  {
    name: "scikit-learn",
    quote: "A Python library providing simple and efficient tools for data mining and machine learning. It includes algorithms for classification, regression, clustering, and dimensionality reduction, making it a versatile choice for machine learning tasks.",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
  },
  {
    name: "TensorFlow/Keras",
    quote: "TensorFlow is a comprehensive framework for building machine learning models, and Keras is its high-level API for easy model development. They are widely used for training and deploying deep learning models.",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/20/Tensorflow-svgrepo-com.svg"
  },
  {
    name: "MERN",
    quote: "A popular stack for building full-stack web applications using JavaScript. MongoDB is a NoSQL database, Express.js is a backend framework, React is a frontend library, and Node.js is a runtime environment for server-side code.",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/94/MERN-logo.png"
  },
  {
    name: "NextJS",
    quote: "",
    img: "https://www.drupal.org/files/project-images/nextjs-icon-dark-background.png"
  },
  {
    name: "Git Hub",
    quote: "",
    img: "./git.png"
  },
  {
    name: "PyTorch",
    quote: "",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/99/Pytorch-svgrepo-com.svg"
  },
  {
    name: "Pandas",
    quote: "",
    img: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Pandas_logo.svg"
  },
  {
    name: "Numpy",
    quote: "",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/67/Numpy-svgrepo-com.svg"
  },
  {
    name: "FireBase",
    quote: "",
    img: "/firebase.svg"
  },

];

export const companies = [
  {
    id: 1,
    name: "cloudinary",
    img: "/cloud.svg",
    nameImg: "/cloudName.svg",
  },
  {
    id: 2,
    name: "appwrite",
    img: "/app.svg",
    nameImg: "/appName.svg",
  },
  {
    id: 3,
    name: "HOSTINGER",
    img: "/host.svg",
    nameImg: "/hostName.svg",
  },
  {
    id: 4,
    name: "stream",
    img: "/s.svg",
    nameImg: "/streamName.svg",
  },
  {
    id: 5,
    name: "docker.",
    img: "/dock.svg",
    nameImg: "/dockerName.svg",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "AI/ML Research Intern",
    desc: "June 2024 - August 2024 @ RAPID, PES University",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: "Blockchain Developer",
    desc: "December 2024 - March 2025 @ AnythingAI",
    className: "md:col-span-2",
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "Back-End Developer",
    desc: "March 2025 - Present @ GoQuant",
    className: "md:col-span-2",
    thumbnail: "/exp3.svg",
  },

];

export const socialMedia = [
  {
    id: 1,
    img: "https://upload.wikimedia.org/wikipedia/commons/2/24/Github_logo_svg.svg",
    link: "https://github.com/GSL006"
  },
  {
    id: 2,
    img: "https://upload.wikimedia.org/wikipedia/commons/0/05/Iconfinder_social-instagram-new-circle_1164349_%281%29.png",
    link: "https://www.instagram.com/gagan_sl/"
  },
  {
    id: 3,
    img: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Linkedin_circle.svg",
    link: "https://www.linkedin.com/in/gagan-sl/"
  },
  {
    id: 4,
    img: "/leetcode.svg",
    link: "https://leetcode.com/u/GSL006/"
  },
];
