export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Skills", link: "#Skills" },
  { name: "GitHub", link: "#github" },
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
    title: "IST timezone · EST-friendly hours · Available till 1 AM",
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
    title: "Tech enthusiast with a passion for development",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Leading OTC Integrations at GoQuant",
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
    title: "StockGEN",
    des: "Developed a transformer based stock price/trend prediction model and Confidence + Recommendation using T5-flan.",
    img: "/stock.png",
    iconLists: ["https://upload.wikimedia.org/wikipedia/commons/9/99/Pytorch-svgrepo-com.svg", "/hf-logo.svg", "/flask.png", "https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/files/python-logo-only.svg", "/stream.svg"],
    iconNames: ["PyTorch", "HuggingFace", "Flask", "Python", "Streamlit"],
    link: "https://github.com/GSL006/Stock-Predictor-v2",
    details: [
      "Collected historical OHLC price data for the top 50 stocks using yFinance and retrieved real-time news sentiment via Alpaca News API; engineered a unified dataset combining 7-day rolling price windows with corresponding FinBERT sentiment scores.",
      "Designed and implemented a Transformer-based model (PyTorch) for next-day price prediction, achieving 79% accuracy within a ±$3 threshold; applied LoRA fine-tuning on Flan-T5 to output interpretability metrics and confidence-weighted trading recommendations.",
      "Served the model through a Flask REST API supporting batch prediction requests and real-time inference; created a Streamlit dashboard displaying live predictions, model confidence, sentiment trends, and interactive visualization of attention weights.",
      "Conducted hyperparameter tuning (learning rate, head count, dropout), performed ablation studies on sentiment versus price-only input, and benchmarked against baseline models, delivering detailed evaluation metrics and confusion matrix heatmaps."
    ],
  },
  {
    id: 2,
    title: "AI Micro Trend Hunter",
    des: "Engineered an automated micro-trend detection pipeline processing 20-50 AI news articles hourly, clustering with HDBSCAN and scoring microtrends via time-decay velocity",
    img: "/mic_trend.png",
    iconLists: ["https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/files/python-logo-only.svg", "./git.svg", "/gnews.png", "/hackernews.png", "/hf-logo.svg"],
    iconNames: ["Python", "GitHub Actions", "GNews API", "Hacker News API", "HuggingFace"],
    link: "https://github.com/GSL006/AI_Micro_Trend_Hunter",
    details: [
      "Engineered an automated trend-spotting pipeline scraping 20-50 AI-related articles per hour from Google News and Hacker News, embedding headlines using Sentence Transformers, clustering emerging topics via HDBSCAN.",
      "Calculated micro-trend velocity by tracking cluster growth over time using time-decay weighting; assigned a velocity score to each cluster, triggering alerts for clusters with ≥ 3 new articles and velocity ≥ 0.5.",
      "Fully deployed via GitHub Actions for hourly execution on zero-cost infrastructure; alerts are pushed to a Telegram channel with cluster summary, sample headlines, and sentiment snapshot.",
      "Achieved robust data logging and modular design—scraping, embedding, clustering, scoring, and alerting are decoupled—allowing easy extension to new sources and tuning of alert sensitivity thresholds."
    ],
  },
  {
    id: 3,
    title: "Location Based Reminder",
    des: "Developed a web app that triggers reminders based on user location. Users set reminders with title, description, and coordinates, receiving email alerts when within 100 meters.",
    img: "/go.png",
    iconLists: ["https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg", "/js.svg", "/jq.svg", "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg", "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg"],
    iconNames: ["GoLang", "JavaScript", "jQuery", "HTML5", "CSS3"],
    link: "https://github.com/GSL006/Location-Based-Reminder",
    details: [
      "Developed a geofencing web app where users specify reminders with title, description, and GPS coordinates; the frontend uses Leaflet.js for map-based point selection and dynamic UI interaction via jQuery.",
      "Implemented Go backend to receive user-defined geofences, periodically check active user locations against stored zones, and trigger event-generation logic when users enter a 100m radius.",
      "Set up automated email notifications via SMTP to users upon geofence entry, ensuring delivery reliability and retry logic.",
      "Designed the system for scalability and ease of extension—backend separates reminder storage, location polling, geofence evaluation, and notification dispatch into modular Go services."
    ],
  },
  {
    id: 4,
    title: "DriveIO",
    des: "The platform is a car rental solution where users sign up as owners to rent out cars or as customers to book them. Built with Next.js, MySQL, Node.js, and Express.js.",
    img: "/driveio.png",
    iconLists: ["/next.svg", "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg", "/sql.svg", "/firebase.svg", "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"],
    iconNames: ["Next.js", "Node.js", "MySQL", "Firebase", "PayPal"],
    link: "https://github.com/GSL006/DriveIO",
    details: [
      "Created a full-stack car rental platform enabling vehicle owners to list and renters to book, featuring dynamic multi-step listing and booking workflows, personalized dashboards, and robust user authentication.",
      "Designed relational schema with MySQL, implemented payment flows via PayPal API and secured session management with Firebase Auth.",
      "Developed Express.js REST endpoints for listing creation, booking management, and availability search; optimized query performance using indexing and pagination.",
      "Built an admin dashboard for managing listings, tracking rental history, analyzing income trends, and exporting CSV reports; implemented SQL aggregation queries for daily, monthly, and year-to-date revenue tracking.",
      "Integrated Firebase Cloud Messaging for real-time booking notifications to owners and renters, improving engagement and response time."
    ],
  },
];

export const Skills = [
  {
    name: "Python",
    quote:"",
    img: "https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/files/python-logo-only.svg",
  },
  {
    name: "Java",
    quote:"",
    img: "/java-icon.svg"
  },
  {
    name: "C/C++",
    quote:"",
    img: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg"
  },
  {
    name: "SQL",
    quote:"",
    img: "/sql.svg"
  },
  {
    name: "JS",
    quote:"",
    img: "/js.svg"
  },
  {
    name: "R",
    quote:"",
    img: "https://upload.wikimedia.org/wikipedia/commons/1/1b/R_logo.svg",
  },
  {
    name: "Go",
    quote:"",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg",
  },
  {
    name: "scikit-learn",
    quote:"",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
  },
  {
    name: "TensorFlow/Keras",
    quote:"",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/20/Tensorflow-svgrepo-com.svg"
  },
  {
    name: "MERN",
    quote:"",
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
    img: "/pandas.png"
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
  {
    name: "Flask",
    quote: "",
    img: "/flask.png"
  },
  {
    name: "Stripe",
    quote: "",
    img: "/stripe.svg"
  },
  {
    name: "Docker",
    quote: "",
    img: "/dock.svg"
  },
  {
    name: "Stream",
    quote: "",
    img: "/stream.svg"
  },
  {
    name: "Hugging Face",
    quote: "",
    img: "/hf-logo.svg"
  },
  {
    name: "FastAPI",
    quote: "",
    img: "/fastapi.svg"
  }
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
    thumbnail: "/pes.png",
    details: [
      "Designed a news-aware stock price prediction pipeline by combining Alpaca and YFinance APIs for historical and real-time news data; performed NLP preprocessing using spaCy and TF-IDF.",
      "Applied LDA topic modeling via GENSIM on 100,000 news articles to extract dominant market themes and engineered these topics into input features for supervised learning.",
      "Trained and evaluated multiple models (Linear Regression, FNN, Decision Trees), achieving 89.06% accuracy on FNN within a ±$5 margin, outperforming baselines by 15%.",
      "Deployed the entire pipeline into a Streamlit app with live predictions, model switcher, and interpretability module to visualize news influence on predictions.",
      "Authored a research paper detailing methodology, results, and limitations."
    ],
  },
  {
    id: 2,
    title: "Blockchain Developer",
    desc: "December 2024 - March 2025 @ AnythingAI",
    className: "md:col-span-2",
    thumbnail: "/anythingai.jpg",
    details: [
      "Built an automated trading system for decentralized platforms, replicating top 100 traders' strategies using a headless browser scraper; initially stored strategy data in CSVs and Google Sheets, later migrated to PostgreSQL for better performance, scalability, and query efficiency.",
      "Developed a lightweight cryptocurrency trading bot for Binance using the official Binance API, capable of executing up to 1000 trades per day; implemented trade validation logic, signal-based triggers, and daily activity summaries in Google Docs.",
      "Integrated APIs for real-time price feeds and historical trade data, enabling the bot to make reactive decisions based on current market trends.",
      "Conducted performance tuning and debugging to maintain sub-second latency per trade; monitored throughput and downtime using Google App Scripts and alerting dashboards."
    ],
  },
  {
    id: 3,
    title: "Back-End Developer",
    desc: "March 2025 - Present @ GoQuant",
    className: "md:col-span-2",
    thumbnail: "/goquant.webp",
    details: [
      "Engineer low-latency, high-throughput trading systems for global exchanges (e.g., BitMEX, Binance, OKX, Hercle) by designing reusable back-end modules for order routing, position tracking, and slippage management, and collaborating on multi-account OMS logic and high-frequency order placement systems to ensure fault tolerance, precision, compliance, and scalability across microservices.",
      "Built and optimized real-time OTC (Over The Counter) trading flows (RFQ, RFS) using FastAPI, async I/O, and WebSocket streaming, while leading the integration of 20+ crypto-native OTC exchanges to streamline onboarding and expand liquidity access across the platform.",
      "Contribute to GoMarket-CPP, a high-performance WebSocket/REST gateway for fetching market data and symbol information from multiple exchanges, providing unified, low-latency data access that powers the product's orderbook.",
      "Maintain and expand GQ-Docs, the core documentation platform for GoQuant, by adding detailed OTC exchange integrations, improving clarity and structure, and continuously updating it with new features and products introduced into the ecosystem."
    ],
  },
  {
    id: 4,
    title: "Data Structures and Algorithms Teaching Assistant Head",
    desc: "July 2025 - Present @ PES University",
    className: "md:col-span-2",
    thumbnail: "/pes.png",
    details: [
      "Lead a team of teaching assistants in supporting DSA course.",
      "Conduct weekly lab sessions and doubt-clearing workshops.",
      "Design and grade assignments, quizzes, and coding assessments.",
      "Mentor students on algorithm optimization and problem-solving techniques."
    ],
  },

];

export const socialMedia = [
  {
    id: 1,
    img: "https://upload.wikimedia.org/wikipedia/commons/2/24/Github_logo_svg.svg",
    link: "https://github.com/gagan-sl6"
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
  {
    id: 6,
    img: "/gmail.svg",
    link: "https://mail.google.com/mail/?view=cm&to=gagansl62004@gmail.com"
  }
];

export const githubContributions = {
  username: "gagan-sl6",
  profileUrl: "https://github.com/gagan-sl6",
};