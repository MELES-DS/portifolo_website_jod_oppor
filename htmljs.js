(function () {
  'use strict';

  /* ============================================================
     EMAILJS CONFIG
     ============================================================ */
  const EMAILJS_SERVICE_ID  = 'service_s9fgiww';
  const EMAILJS_TEMPLATE_ID = 'template_r4ob1ub';
  const EMAILJS_PUBLIC_KEY  = 'CJRx1_eb4cC1nUHEU';
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  /* ============================================================
     🌍 TRANSLATIONS
     ============================================================ */
  const STRINGS = {
    en: {
      'brand': 'Portfolio',
      'nav.home': 'Home', 'nav.about': 'About Me', 'nav.education': 'Education',
      'nav.skills': 'Skills', 'nav.projects': 'Projects',
      'nav.certificates': 'Certificates', 'nav.services': 'Services',
      'nav.cv': 'CV', 'nav.contact': 'Contact',

      'home.title': 'Welcome Everyones', 'home.greet': "Hi, I'm", 'home.name': 'Melis Melakie',
      'home.desc': "I'm a passionate Data Science student interested in turning data into meaningful insights and practical solutions. I enjoy working with data, exploring patterns, analysing data, building machine learning models, develop data-driven applications and projects that solve real-world problems.",
      'home.viewProjects': 'View Projects', 'home.getInTouch': 'Get in Touch',

      'stats.visitorsShort': 'Visitors',
      'stats.rateShort': 'Rate my work',
      'stats.ratings': 'ratings',
      'stats.alreadyRated': 'You already rated',
      'stats.thanks': '✓ Thank you for your rating!',

      'about.title': 'About Me',
      'about.intro': "Data Science student passionate about transforming data into meaningful insights through analysis, visualization, machine learning, deep learning and Ms-excel.",
      'about.academic': 'Academic Background',
      'about.academicDesc': 'Currently pursuing a B.Sc. in Data Science with a focus on ML, data science, statistics, and data engineering.',
      'about.career': 'Career Interests',
      'about.careerDesc': 'Passionate about applied machine learning, NLP, and building data products that create real impact.',
      'about.goals': 'Professional Goals',
      'about.goalsDesc': 'To become a data scientist who ships end-to-end ML systems from data collection to deployment.',

      'skills.title': 'Skills',
      'skills.empty': 'No skills found in this category.',
      'skills.selectCategory': 'Select a category above.',

      'cat.programming': 'Programming',
      'cat.datasci': 'Data Science',
      'cat.tools': 'Tools & Platforms',
      'cat.soft': 'Soft Skills',

      'lvl.advanced': 'Advanced',
      'lvl.intermediate': 'Intermediate',
      'lvl.basic': 'Basic',

      'skill.python': 'Python', 'skill.r': 'R', 'skill.sql': 'SQL',
      'skill.javascript': 'JavaScript', 'skill.java': 'Java',
      'skill.pandas': 'Pandas', 'skill.numpy': 'NumPy', 'skill.sklearn': 'Scikit-learn',
      'skill.tensorflow': 'TensorFlow', 'skill.matplotlib': 'Matplotlib',
      'skill.statistics': 'Statistics', 'skill.nlp': 'NLP',
      'skill.git': 'Git / GitHub', 'skill.jupyter': 'Jupyter', 'skill.tableau': 'Tableau',
      'skill.excel': 'Excel', 'skill.docker': 'Docker', 'skill.aws': 'AWS / Cloud',
      'skill.communication': 'Communication', 'skill.teamwork': 'Teamwork',
      'skill.problem': 'Problem Solving', 'skill.time': 'Time Management',
      'skill.critical': 'Critical Thinking', 'skill.presentation': 'Presentation',

      'projects.title': 'Projects',
      'projects.github': 'View on GitHub',
      'projects.viewMore': 'View More',
      'projects.viewLess': 'View Less',

      'proj.churn.title': 'Customer Churn Prediction',
      'proj.churn.desc': 'Built a classification model to predict telecom churn using logistic regression and random forests. Achieved 87% accuracy.',
      'proj.cnn.title': 'Image Classification with CNN',
      'proj.cnn.desc': 'Developed a convolutional neural network to classify CIFAR-10 images using TensorFlow/Keras. Explored augmentation and dropout.',
      'proj.covid.title': 'COVID-19 Data Dashboard',
      'proj.covid.desc': 'Interactive dashboard visualizing global COVID-19 trends using Plotly and Pandas. Deployed as a static site with GitHub Pages.',
      'proj.movie.title': 'Movie Recommender System',
      'proj.movie.desc': 'Collaborative filtering and content-based recommendation engine using MovieLens dataset. Built with Surprise and Scikit-learn.',
      'proj.sentiment.title': 'Sentiment Analysis on Tweets',
      'proj.sentiment.desc': 'NLP pipeline for sentiment classification using NLTK and transformers. Fine-tuned BERT for tweet sentiment detection.',
      'proj.sales.title': 'SQL Sales Analytics',
      'proj.sales.desc': 'Analyzed retail sales data with advanced SQL queries (window functions, CTEs) to identify top products and regional trends.',
      'proj.timeseries.title': 'Time Series Forecasting',
      'proj.timeseries.desc': 'Built ARIMA and LSTM models to forecast stock prices. Compared classical statistical methods against deep learning.',
      'proj.fraud.title': 'Fraud Detection System',
      'proj.fraud.desc': 'Anomaly detection for credit card transactions using isolation forest and autoencoders. Achieved 94% precision.',

      'tag.python': 'Python', 'tag.sklearn': 'Scikit-learn', 'tag.pandas': 'Pandas',
      'tag.tensorflow': 'TensorFlow', 'tag.keras': 'Keras', 'tag.cnn': 'CNN',
      'tag.plotly': 'Plotly', 'tag.dataviz': 'Data Viz',
      'tag.surprise': 'Surprise', 'tag.ml': 'ML',
      'tag.nlp': 'NLP', 'tag.bert': 'BERT', 'tag.nltk': 'NLTK',
      'tag.sql': 'SQL', 'tag.postgresql': 'PostgreSQL', 'tag.analytics': 'Analytics',
      'tag.timeseries': 'Time Series', 'tag.arima': 'ARIMA', 'tag.lstm': 'LSTM',
      'tag.anomaly': 'Anomaly Detection',

      'certs.title': 'Certificates',
      'certs.empty': 'No certificates found in this category yet.',
      'certs.view': 'View',

      'certcat.oreilly': "O'Reilly",
      'certcat.gebeya': 'Gebeya',
      'certcat.demera': 'Demera Project',
      'certcat.club': 'Club',
      'certcat.udacity': 'Udacity',
      'certcat.kenexio': 'Kenexio',
      'certcat.recognition': 'Recognition',
      'certcat.other': 'Other',

      'cert.ml.title': 'Machine Learning Engineer Nanodegree',
      'cert.ml.desc': 'Comprehensive program covering supervised and unsupervised learning, deep learning, and deployment.',
      'cert.da.title': 'Data Analyst Nanodegree',
      'cert.da.desc': 'Focused on data wrangling, exploratory data analysis, and data visualization with Python.',
      'cert.ds.title': 'Data Science Bootcamp',
      'cert.ds.desc': 'Intensive bootcamp covering Python, statistics, machine learning, and capstone projects.',
      'cert.cloud.title': 'Cloud Fundamentals',
      'cert.cloud.desc': 'Introduction to cloud computing concepts, AWS core services, and deploying data workloads.',
      'cert.ds2.title': 'Data Science Fundamentals',
      'cert.ds2.desc': 'Core concepts of data science: data types, statistical reasoning, and analytical thinking.',
      'cert.entre.title': 'Entrepreneurship',
      'cert.entre.desc': 'Building entrepreneurial mindset, business models, and startup fundamentals.',
      'cert.homl.title': 'Hands-On Machine Learning',
      'cert.homl.desc': 'Practical training on building ML pipelines with Scikit-learn, TensorFlow, and Keras.',
      'cert.de.title': 'Data Engineering with Python',
      'cert.de.desc': 'ETL pipelines, data warehousing, and workflow orchestration using Python and Airflow.',
      'cert.social.title': 'Data for Social Impact',
      'cert.social.desc': 'Applied data science to social-good projects, including health and education analytics.',
      'cert.community.title': 'Community Data Analytics',
      'cert.community.desc': 'Hands-on program analyzing community datasets and building dashboards for local NGOs.',
      'cert.sqladv.title': 'Advanced SQL for Analytics',
      'cert.sqladv.desc': 'Mastering window functions, CTEs, query optimization, and analytical SQL patterns.',
      'cert.pbi.title': 'Power BI Essentials',
      'cert.pbi.desc': 'Building interactive dashboards and reports with Power BI and DAX fundamentals.',
      'cert.clublead.title': 'Data Science Club Lead',
      'cert.clublead.desc': 'Led weekly workshops on Python, ML, and data visualization for 50+ student members.',
      'cert.hack.title': 'Hackathon Winner — Data Track',
      'cert.hack.desc': 'First place for a real-time analytics dashboard built in 48 hours using Python and Plotly.',
      'cert.dean.title': "Dean's List — Academic Excellence",
      'cert.dean.desc': 'Recognized for outstanding academic performance in the Data Science program.',
      'cert.capstone.title': 'Best Capstone Project Award',
      'cert.capstone.desc': 'Awarded for an outstanding capstone project on predictive maintenance using ML.',
      'cert.google.title': 'Google Data Analytics Certificate',
      'cert.google.desc': 'Professional certificate covering data cleaning, analysis, visualization, and R programming.',
      'cert.dl.title': 'Deep Learning Specialization',
      'cert.dl.desc': 'Five-course specialization on neural networks, CNNs, RNNs, and sequence models.',
      'cert.ibm.title': 'IBM Data Science Professional',
      'cert.ibm.desc': 'Hands-on program covering Python, SQL, ML, and data science methodology.',

      'srv.title': 'Services',
      'srv.empty': 'No services in this category yet.',
      'srv.intro': 'What I can do for you',

      'srvcat.data-analysis': 'Data Analysis',
      'srvcat.ml': 'Machine Learning',
      'srvcat.dataviz': 'Data Visualization',
      'srvcat.consulting': 'Consulting',
      'srvcat.training': 'Training',

      'srv1.job': 'Data Analysis & Insights',
      'srv1.company': 'For Business & Research',
      'srv1.desc': 'Clean, explore, and interpret complex datasets to extract actionable insights. Deliver clear reports with recommendations that drive business decisions.',
      'srv1.duration': 'Available now',
      'srv1.tag1': 'Python', 'srv1.tag2': 'SQL', 'srv1.tag3': 'Excel', 'srv1.tag4': 'Reporting',

      'srv2.job': 'Machine Learning Models',
      'srv2.company': 'For Predictive Products',
      'srv2.desc': 'Design, train, and deploy supervised and unsupervised ML models for classification, regression, forecasting, and anomaly detection.',
      'srv2.duration': 'Available now',
      'srv2.tag1': 'Scikit-learn', 'srv2.tag2': 'TensorFlow', 'srv2.tag3': 'XGBoost',

      'srv3.job': 'Interactive Dashboards',
      'srv3.company': 'For Real-time Monitoring',
      'srv3.desc': 'Build modern, interactive data visualizations with Plotly, Dash, and Tableau. Turn static spreadsheets into compelling, live dashboards.',
      'srv3.duration': 'Available now',
      'srv3.tag1': 'Plotly', 'srv3.tag2': 'Dash', 'srv3.tag3': 'Tableau',

      'srv4.job': 'Data Strategy Consulting',
      'srv4.company': 'For Data-driven Teams',
      'srv4.desc': 'Advise on data collection, warehousing, and analytics workflows. Help teams design KPIs and analytics roadmaps that scale with business goals.',
      'srv4.duration': 'By appointment',
      'srv4.tag1': 'Strategy', 'srv4.tag2': 'KPIs', 'srv4.tag3': 'Roadmap',

      'srv5.job': 'Python & ML Training',
      'srv5.company': 'For Individuals & Teams',
      'srv5.desc': "Hands-on workshops on Python, data science fundamentals, and applied machine learning. Tailored to your team's level and goals.",
      'srv5.duration': 'Flexible schedule',
      'srv5.tag1': 'Python', 'srv5.tag2': 'ML', 'srv5.tag3': 'Mentoring',

      'edu.title': 'Education',
      'edu.elementary.title': 'Primary Education',
      'edu.elementary.sub': 'Abessken Elementary School',
      'edu.elementary.desc': 'Participated in science fairs and math competitions.',
      'edu.elementary.meta': '2010 – 2018',
      'edu.highschool.title': 'High School',
      'edu.highschool.sub': 'Abay Minch preparatory school',
      'edu.highschool.desc': 'A stream of natural sciences.',
      'edu.highschool.meta': '2019 – 2022',
      'edu.university.title': 'University',
      'edu.university.sub': 'B.Sc. in Data Science',
      'edu.university.desc': "Currently pursuing a Bachelor's degree in Data Science with focus on machine learning, statistics, and data engineering.",
      'edu.university.meta': '2023 – Present',
      'edu.online.title': 'Online Specializations',
      'edu.online.sub': 'Certifications & Courses',
      'edu.online.desc': "Completed multiple specializations on O'Reilly, Gebeya, Demera/Percipio, Amazon, Data Camp and Udacity to deepen practical ML and analytics skills.",
      'edu.online.meta': 'Ongoing',

      'cv.title': 'Curriculum Vitae',
      'cv.heading': 'Melis Melakie — Curriculum Vitae',
      'cv.desc': 'A concise overview of my education, technical skills, projects, and certifications.',
      'cv.open': 'Open CV', 'cv.download': 'Download CV',

      'contact.title': 'Contact',
      'contact.desc': "Send me an email and I'll get back to you as soon as possible.",
      'contact.name': 'Your name', 'contact.email': 'Your email',
      'contact.message': 'Your message...', 'contact.send': 'Send Message',
      'contact.orEmail': 'Or email me directly at',
      'contact.success': '✓ Message sent successfully! I will reply soon.',
      'contact.error': 'Please fill in all fields with a valid email.',
      'contact.sending': 'Sending message...',
      'contact.serverError': 'Something went wrong. Please email me directly.',

      'media.noImage': 'No image', 'media.noPreview': 'No preview',
      'footer.tagline': 'Data Science Student · Building intelligent systems',
      'footer.copy': '© 2025 Melis Melakie · All rights are reserved. <i class="fas fa-heart"></i>'
    },
    am: {
      'brand': 'ፖርትፎሊዮ',
      'nav.home': 'መነሻ', 'nav.about': 'ስለ እኔ', 'nav.education': 'ትምህርት',
      'nav.skills': 'ክህሎቶች', 'nav.projects': 'ፕሮጀክቶች',
      'nav.certificates': 'ሰርተፊኬቶች', 'nav.services': 'አገልግሎቶች',
      'nav.cv': 'ሲቪ', 'nav.contact': 'አግኙኝ',

      'home.title': 'እንኳን ደህና መጡ', 'home.greet': 'ሰላም፣ እኔ', 'home.name': ' መልስ መላኬ ነኝ',
      'home.desc': 'መረጃን ወደ ትርጉም ግንዛቤዎች እና ተግባራዊ መፍትሄዎች ለመለወጥ ፍላጎት ያለው የውሂብ ሳይንስ ተማሪ ነኝ። ከውሂብ ጋር መስራት፣ ቅጦችን ማሰስ፣ መረጃን በመተንተን፣ የማሽን መማሪያ ሞዴሎችን መገንባት፣ በውሂብ ላይ የተመሰረቱ አፕሊኬሽኖችን ማዳበር እና የገሃዱ አለም ችግሮችን የሚፈቱ ፕሮጀክቶችን መስራት ያስደስተኛል።',
      'home.viewProjects': 'ፕሮጀክቶችን ይመልከቱ', 'home.getInTouch': 'ያግኙኝ',

      'stats.visitorsShort': 'ጎብኚዎች',
      'stats.rateShort': 'ሥራዬን ይገምግሙ',
      'stats.ratings': 'ደረጃዎች',
      'stats.alreadyRated': 'አስቀድመው ገምግመዋል',
      'stats.thanks': '✓ ስለ ግምገማዎ እናመሰግናለን!',

      'about.title': 'ስለ እኔ',
      'about.intro': 'እኔ የውሂብ ሳይንስ ተማሪ ነኝ መረጃን በመተንተን፣ በምስል እይታ፣ በማሽን መማር፣ በጥልቅ መማር እና በኤምኤስ-ኤክሴል ትርጉም ወዳለው ግንዛቤ የመቀየር ፍላጎት አለኝ።',
      'about.academic': 'የትምህርት ዳራ',
      'about.academicDesc': 'በዳታ ሳይንስ የB.Sc. ዲግሪ በML፣ በስታቲስቲክስ እና በዳታ ኢንጂኒየሪንግ ላይ ትኩረት በማድረግ እያጠና ነው።',
      'about.career': 'የሙያ ፍላጎቶች',
      'about.careerDesc': 'በተግባራዊ ማሽን ለርኒን፣ በNLP እና እውነተኛ ተጽዕኖ የሚፈጥሩ የዳታ ምርቶችን በመገንባት ላይ ፍላጎት አለኝ።',
      'about.goals': 'ሙያዊ ግቦች',
      'about.goalsDesc': 'ከዳታ ስብሰባ እስከ ማሰማራት ድረስ ሙሉ በሙሉ የML ስርዓቶችን የሚያቀርብ የዳታ ሳይንቲስት መሆን።',

      'skills.title': 'ክህሎቶች',
      'skills.empty': 'በዚህ ምድብ ውስጥ ምንም ክህሎት አልተገኘም።',
      'skills.selectCategory': 'ከላይ ምድብ ይምረጡ።',

      'cat.programming': 'ፕሮግራሚንግ',
      'cat.datasci': 'ዳታ ሳይንስ',
      'cat.tools': 'መሳሪያዎች እና መድረኮች',
      'cat.soft': 'ለስላሳ ክህሎቶች',

      'lvl.advanced': 'የላቀ',
      'lvl.intermediate': 'መካከለኛ',
      'lvl.basic': 'መሠረታዊ',

      'skill.python': 'ፓይተን', 'skill.r': 'አር', 'skill.sql': 'ኤስኪዩኤል',
      'skill.javascript': 'ጃቫስክሪፕት', 'skill.java': 'ጃቫ',
      'skill.pandas': 'ፓንዳስ', 'skill.numpy': 'ኒውምፓይ', 'skill.sklearn': 'ሳይኪት-ለርን',
      'skill.tensorflow': 'ቴንሰርፍሎው', 'skill.matplotlib': 'ማትፕሎትሊብ',
      'skill.statistics': 'ስታቲስቲክስ', 'skill.nlp': 'ኤንኤልፒ',
      'skill.git': 'ጊት / ጊትሃብ', 'skill.jupyter': 'ጁፒተር', 'skill.tableau': 'ታብሎ',
      'skill.excel': 'ኤክሴል', 'skill.docker': 'ዶከር', 'skill.aws': 'ኤደብሊውኤስ / ክላውድ',
      'skill.communication': 'ግንኙነት', 'skill.teamwork': 'የቡድን ሥራ',
      'skill.problem': 'ችግር መፍታት', 'skill.time': 'የጊዜ አስተዳደር',
      'skill.critical': 'አስተሳሰብ', 'skill.presentation': 'አቀራረብ',

      'projects.title': 'ፕሮጀክቶች',
      'projects.github': 'በ GitHub ይመልከቱ',
      'projects.viewMore': 'ተጨማሪ ይመልከቱ',
      'projects.viewLess': 'ያነሰ ይመልከቱ',

      'proj.churn.title': 'የደንበኛ መቀየር ትንበያ',
      'proj.churn.desc': 'ሎጂስቲክ ሪግሬሽን እና ራንደም ፎረስትን በመጠቀም የቴሌኮም መቀየርን ለመተንበይ ሞዴል ተገንብቷል። 87% ትክክለኛነት አግኝቷል።',
      'proj.cnn.title': 'በሲኤንኤን ምስል ምደባ',
      'proj.cnn.desc': 'TensorFlow/Keras በመጠቀም CIFAR-10 ምስሎችን ለመመደብ ኮንቮሉሽናል ኒውራል ኔትወርክ ተገንብቷል።',
      'proj.covid.title': 'የኮቪድ-19 ዳታ ዳሽቦርድ',
      'proj.covid.desc': 'Plotly እና Pandas በመጠቀም የአለም አቀፍ የኮቪድ-19 አዝማሚያዎችን የሚያሳይ በይነተገናኝ ዳሽቦርድ።',
      'proj.movie.title': 'የፊልም ምክር ስርዓት',
      'proj.movie.desc': 'MovieLens ዳታሴትን በመጠቀም በትብብር ማጣሪያ እና በይዘት ላይ የተመሠረተ ምክር ስርዓት።',
      'proj.sentiment.title': 'በትዊት ላይ ስሜት ትንተና',
      'proj.sentiment.desc': 'NLTK እና ትራንስፎርመሮችን በመጠቀም ለስሜት ምደባ የNLP ቧንቧ።',
      'proj.sales.title': 'የSQL ሽያጭ ትንተና',
      'proj.sales.desc': 'ዋና ምርቶችን እና የክልል አዝማሚያዎችን ለመለየት የላቀ SQL መጠይቆችን በመጠቀም የችርቻሮ ሽያጭ ዳታ ተተነተነ።',
      'proj.timeseries.title': 'የጊዜ ተከታታይ ትንበያ',
      'proj.timeseries.desc': 'የአክሲዮን ዋጋዎችን ለመተንበይ ARIMA እና LSTM ሞዴሎች ተገንብተዋል።',
      'proj.fraud.title': 'የማጭበርበር ማወቂያ ስርዓት',
      'proj.fraud.desc': 'isolation forest እና autoencoders በመጠቀም የክሬዲት ካርድ ግብይቶችን የማወቂያ ስርዓት። 94% ትክክለኛነት አግኝቷል።',

      'tag.python': 'ፓይተን', 'tag.sklearn': 'ሳይኪት-ለርን', 'tag.pandas': 'ፓንዳስ',
      'tag.tensorflow': 'ቴንሰርፍሎው', 'tag.keras': 'ኬራስ', 'tag.cnn': 'ሲኤንኤን',
      'tag.plotly': 'ፕሎትሊ', 'tag.dataviz': 'ዳታ ምስላዊነት',
      'tag.surprise': 'ሰርፕራይዝ', 'tag.ml': 'ML',
      'tag.nlp': 'NLP', 'tag.bert': 'BERT', 'tag.nltk': 'NLTK',
      'tag.sql': 'SQL', 'tag.postgresql': 'PostgreSQL', 'tag.analytics': 'ትንታኔ',
      'tag.timeseries': 'ጊዜ ተከታታይ', 'tag.arima': 'ARIMA', 'tag.lstm': 'LSTM',
      'tag.anomaly': 'ማንጋት ማወቂያ',

      'certs.title': 'ሰርተፊኬቶች',
      'certs.empty': 'በዚህ ምድብ ውስጥ እስካሁን ምንም ሰርተፊኬት አልተገኘም።',
      'certs.view': 'ይመልከቱ',

      'certcat.udacity': 'ዩዳሲቲ',
      'certcat.gebeya': 'ገበያ',
      'certcat.oreilly': 'ኦራይሊ',
      'certcat.demera': 'ደመራ ፕሮጀክት',
      'certcat.kenexio': 'ኬኔክሲዮ',
      'certcat.club': 'ክለብ',
      'certcat.recognition': 'እውቅና',
      'certcat.other': 'ሌላ',

      'cert.ml.title': 'የማሽን ለርኒን ኢንጂኒየር ናኖዲግሪ',
      'cert.ml.desc': 'በቁጥጥር የሚደረግ እና ቁጥጥር የማይደረግ ትምህርት፣ ጥልቅ ትምህርት እና ማሰማራትን የሚሸፍን አጠቃላይ ፕሮግራም።',
      'cert.da.title': 'የዳታ ተንታኝ ናኖዲግሪ',
      'cert.da.desc': 'በዳታ ማጽዳት፣ አሰሳ ዳታ ትንተና እና በPython ዳታ ምስላዊነት ላይ ያተኮረ።',
      'cert.ds.title': 'የዳታ ሳይንስ ቡትካምፕ',
      'cert.ds.desc': 'Python፣ ስታቲስቲክስ፣ ማሽን ለርኒን እና ካፕስቶን ፕሮጀክቶችን የሚሸፍን ከባድ ቡትካምፕ።',
      'cert.cloud.title': 'የክላውድ መሠረታዊ ነገሮች',
      'cert.cloud.desc': 'የክላውድ ኮምፒውቲንግ ፅንሰ-ሀሳቦች፣ የAWS ዋና አገልግሎቶች እና የዳታ ሥራዎችን ማሰማራት መግቢያ።',
      'cert.ds2.title': 'የዳታ ሳይንስ መሠረታዊ ነገሮች',
      'cert.ds2.desc': 'የዳታ ሳይንስ ዋና ፅንሰ-ሀሳቦች፡ የዳታ ዓይነቶች፣ ስታቲስቲካዊ አስተሳሰብ እና የትንታኔ አስተሳሰብ።',
      'cert.entre.title': 'ሥራ ፈጣሪነት',
      'cert.entre.desc': 'የሥራ ፈጣሪ አስተሳሰብ፣ የንግድ ሞዴሎች እና የጀማሪ ንግድ መሠረታዊ ነገሮች።',
      'cert.homl.title': 'በተግባር ላይ የተመሠረተ ማሽን ለርኒን',
      'cert.homl.desc': 'በScikit-learn፣ TensorFlow እና Keras የML ቧንቧዎችን በመገንባት ላይ ተግባራዊ ስልጠና።',
      'cert.de.title': 'በPython ዳታ ኢንጂኒየሪንግ',
      'cert.de.desc': 'የETL ቧንቧዎች፣ የዳታ መጋዘን እና በPython እና Airflow የሥራ ፍሰት ማስተባበር።',
      'cert.social.title': 'ለማህበራዊ ተጽዕኖ ዳታ',
      'cert.social.desc': 'ለማህበራዊ ጥቅም ፕሮጀክቶች የተተገበረ ዳታ ሳይንስ፣ የጤና እና የትምህርት ትንተናን ጨምሮ።',
      'cert.community.title': 'የማህበረሰብ ዳታ ትንተና',
      'cert.community.desc': 'የማህበረሰብ ዳታሴቶችን መተንተን እና ለአካባቢያዊ መንግስታዊ ያልሆኑ ድርጅቶች ዳሽቦርዶችን የመገንባት ተግባራዊ ፕሮግራም።',
      'cert.sqladv.title': 'ለትንተና የላቀ SQL',
      'cert.sqladv.desc': 'የመስኮት ተግባራት፣ CTEዎች፣ የመጠይቅ ማመቻቸት እና የትንታኝ SQL ቅጦችን መቆጣጠር።',
      'cert.pbi.title': 'የPower BI መሠረታዊ ነገሮች',
      'cert.pbi.desc': 'በPower BI እና በDAX መሠረታዊ ነገሮች በይነተገናኝ ዳሽቦርዶችን እና ሪፖርቶችን መገንባት።',
      'cert.clublead.title': 'የዳታ ሳይንስ ክለብ መሪ',
      'cert.clublead.desc': 'ለ50+ ተማሪ አባላት በPython፣ ML እና ዳታ ምስላዊነት ላይ ሳምንታዊ ወርክሾፖችን መርቷል።',
      'cert.hack.title': 'የሃካቶን አሸናፊ — የዳታ ትራክ',
      'cert.hack.desc': 'በ48 ሰዓት ውስጥ በPython እና Plotly የተገነባ የእውነተኛ ጊዜ ትንታኔ ዳሽቦርድ አንደኛ ደረጃ።',
      'cert.dean.title': 'የዲን ዝርዝር — የትምህርት ልዕልና',
      'cert.dean.desc': 'በዳታ ሳይንስ ፕሮግራም ውስጥ ለላቀ የትምህርት አፈጻጸም እውቅና ተሰጥቷል።',
      'cert.capstone.title': 'ምርጥ ካፕስቶን ፕሮጀክት ሽልማት',
      'cert.capstone.desc': 'ML በመጠቀም ትንበያ ጥገና ላይ ለላቀ ካፕስቶን ፕሮጀክት ተሸልሟል።',
      'cert.google.title': 'የGoogle ዳታ ትንታኔ ሰርተፊኬት',
      'cert.google.desc': 'ዳታ ማጽዳት፣ ትንተና፣ ምስላዊነት እና የR ፕሮግራሚንግ የሚሸፍን ሙያዊ ሰርተፊኬት።',
      'cert.dl.title': 'የጥልቅ ትምህርት ስፔሻላይዜሽን',
      'cert.dl.desc': 'በኒውራል ኔትወርኮች፣ CNNዎች፣ RNNዎች እና ተከታታይ ሞዴሎች ላይ አምስት ኮርስ ስፔሻላይዜሽን።',
      'cert.ibm.title': 'የIBM ዳታ ሳይንስ ሙያዊ',
      'cert.ibm.desc': 'Python፣ SQL፣ ML እና የዳታ ሳይንስ ዘዴን የሚሸፍን ተግባራዊ ፕሮግራም።',

      'srv.title': 'አገልግሎቶች',
      'srv.empty': 'በዚህ ምድብ ውስጥ እስካሁን ምንም አገልግሎት አልተገኘም።',
      'srv.intro': 'ለእርስዎ ምን ማድረግ እችላለሁ',

      'srvcat.data-analysis': 'ዳታ ትንተና',
      'srvcat.ml': 'ማሽን ለርኒን',
      'srvcat.dataviz': 'ዳታ ምስላዊነት',
      'srvcat.consulting': 'ምክር',
      'srvcat.training': 'ስልጠና',

      'srv1.job': 'ዳታ ትንተና እና ግንዛቤ',
      'srv1.company': 'ለንግድ እና ምርምር',
      'srv1.desc': 'ውስብስብ ዳታሴቶችን ማጽዳት፣ ማሰስ እና መተርጎም። ውሳኔዎችን የሚያራምዱ ግልጽ ሪፖርቶችን ከምክረ ሀሳቦች ጋር ማቅረብ።',
      'srv1.duration': 'አሁን ይገኛል',
      'srv1.tag1': 'ፓይተን', 'srv1.tag2': 'SQL', 'srv1.tag3': 'ኤክሴል', 'srv1.tag4': 'ሪፖርት',

      'srv2.job': 'የማሽን ለርኒን ሞዴሎች',
      'srv2.company': 'ለትንበያ ምርቶች',
      'srv2.desc': 'ለምደባ፣ ሪግሬሽን፣ ትንበያ እና ማንጋት ማወቂያ የተቆጣጠሩ እና ያልተቆጣጠሩ የML ሞዴሎችን መንደፍ፣ ማሰልጠን እና ማሰማራት።',
      'srv2.duration': 'አሁን ይገኛል',
      'srv2.tag1': 'ሳይኪት-ለርን', 'srv2.tag2': 'ቴንሰርፍሎው', 'srv2.tag3': 'XGBoost',

      'srv3.job': 'በይነተገናኝ ዳሽቦርዶች',
      'srv3.company': 'ለእውነተኛ ጊዜ ክትትል',
      'srv3.desc': 'በPlotly፣ Dash እና Tableau ዘመናዊ በይነተገናኝ ዳታ ምስላዊነቶችን መገንባት። ቋሚ ሰንጠረዦችን ወደ ሕያው ዳሽቦርዶች መቀየር።',
      'srv3.duration': 'አሁን ይገኛል',
      'srv3.tag1': 'ፕሎትሊ', 'srv3.tag2': 'ዳሽ', 'srv3.tag3': 'ታብሎ',

      'srv4.job': 'የዳታ ስትራቴጂ ምክር',
      'srv4.company': 'ለዳታ ተኮር ቡድኖች',
      'srv4.desc': 'በዳታ ስብሰባ፣ ማከማቻ እና የትንታኔ የሥራ ፍሰቶች ላይ ምክር መስጠት። ከንግድ ግቦች ጋር የሚያድጉ የKPI እና የትንታኔ ፍኖተ ካርታዎችን ለመንደፍ ቡድኖችን መርዳት።',
      'srv4.duration': 'በቀጠሮ',
      'srv4.tag1': 'ስትራቴጂ', 'srv4.tag2': 'KPIs', 'srv4.tag3': 'ፍኖተ ካርታ',

      'srv5.job': 'የPython እና ML ስልጠና',
      'srv5.company': 'ለግለሰቦች እና ቡድኖች',
      'srv5.desc': 'በPython፣ በዳታ ሳይንስ መሠረታዊ ነገሮች እና በተግባራዊ ማሽን ለርኒን ላይ ተግባራዊ ወርክሾፖች። ለቡድንዎ ደረጃ እና ግቦች የተበጁ።',
      'srv5.duration': 'ተለዋዋጭ መርሐግብር',
      'srv5.tag1': 'ፓይተን', 'srv5.tag2': 'ML', 'srv5.tag3': 'ማማከር',

      'edu.title': 'ትምህርት',
      'edu.elementary.title': 'የመጀመሪያ ደረጃ ትምህርት',
      'edu.elementary.sub': 'የመጀመሪያ ደረጃ ትምህርት',
      'edu.elementary.desc': 'በሂሳብ፣ በሳይንስ እና በቋንቋዎች ጠንካራ መሠረት ተጥሏል። በሳይንስ ትርኢቶች እና በሂሳብ ውድድሮች ተሳትፏል።',
      'edu.elementary.meta': '2008 – 2016',
      'edu.highschool.title': 'ሁለተኛ ደረጃ ትምህርት',
      'edu.highschool.sub': 'የሳይንስ ክፍል',
      'edu.highschool.desc': 'በሂሳብ፣ በፊዚክስ እና በኮምፒውተር ሳይንስ ላይ ልዩ ትኩረት አድርጓል። የትምህርት ቤቱን ኮዲንግ ክለብ መርቷል እና የክልል ፕሮግራሚንግ ውድድር አሸንፏል።',
      'edu.highschool.meta': '2016 – 2022',
      'edu.university.title': 'ዩኒቨርሲቲ',
      'edu.university.sub': 'የB.Sc. በዳታ ሳይንስ',
      'edu.university.desc': 'በአሁኑ ጊዜ በዳታ ሳይንስ የመጀመሪያ ዲግሪ በማሽን ለርኒን፣ በስታቲስቲክስ እና በዳታ ኢንጂኒየሪንግ ላይ ትኩረት በማድረግ እያጠና ነው።',
      'edu.university.meta': '2023 – አሁን',
      'edu.online.title': 'የመስመር ላይ ስፔሻላይዜሽኖች',
      'edu.online.sub': 'ሰርተፊኬቶች እና ኮርሶች',
      'edu.online.desc': "ተግባራዊ የML እና የትንታኔ ክህሎቶችን ለማጠናከር በO'Reilly፣ Gebeya፣ Demera/Percipio፣ Amazon፣ Data Camp እና Udacity ላይ በርካታ ስፔሻላይዜሽኖችን አጠናቋል።",
      'edu.online.meta': 'ቀጣይ',

      'cv.title': 'የሥራ ማስረጃ',
      'cv.heading': 'ሜሊስ መላኪዬ — የሥራ ማስረጃ',
      'cv.desc': 'ስለ ትምህርቴ፣ ቴክኒካዊ ክህሎቶቼ፣ ፕሮጀክቶቼ እና ሰርተፊኬቶቼ አጭር መግለጫ።',
      'cv.open': 'ሲቪ ክፈት', 'cv.download': 'ሲቪ አውርድ',

      'contact.title': 'አግኙኝ',
      'contact.desc': 'ኢሜል ይላኩልኝ እና በተቻለ ፍጥነት ምላሽ እሰጣለሁ።',
      'contact.name': 'ስምዎ', 'contact.email': 'ኢሜልዎ',
      'contact.message': 'መልእክትዎ...', 'contact.send': 'መልእክት ላክ',
      'contact.orEmail': 'ወይም በቀጥታ ኢሜል ይላኩልኝ በ',
      'contact.success': '✓ መልእክትዎ በተሳካ ሁኔታ ተልኳል!',
      'contact.error': 'እባክዎ ሁሉንም መስኮች ይሙሉ።',
      'contact.sending': 'መልእክት በመላክ ላይ...',
      'contact.serverError': 'ችግር ተፈጥሯል። እባክዎ በቀጥታ ኢሜል ይላኩልኝ።',

      'media.noImage': 'ምስል የለም', 'media.noPreview': 'ቅድመ እይታ የለም',
      'footer.tagline': 'የዳታ ሳይንስ ተማሪ · ብልህ ስርዓቶችን መገንባት',
      'footer.copy': '© 2025 ሜሊስ መላኪዬ · በ <i class="fas fa-heart"></i> የተሰራ በvanilla HTML, CSS እና JavaScript'
    }
  };

  /* ============================================================
     PATH PREFIX
     ============================================================ */
  const ASSET_PREFIX = '../';

  function asset(p) {
    if (!p) return p;
    if (/^(https?:|data:|blob:|file:|\/)/i.test(p)) return p;
    return ASSET_PREFIX + p;
  }

  /* ============================================================
     CONFIG
     ============================================================ */
  const CONFIG = {
    email: 'melismelakie27@gmail.com',
    projectsInitialCount: 5,
    certsInitialCount: 3,
    skillsInitialCount: 5,
    srvInitialCount: 4,

    jobTitles: {
      en: ['Data Scientist', 'ML Engineer', 'Data Analyst', 'Python Developer', 'AI Enthusiast'],
      am: ['የዳታ ሳይንቲስት', 'የML ኢንጂኒየር', 'የዳታ ተንታኝ', 'የPython ገንቢ', 'የAI አፍቃሪ']
    },
    jobRotateInterval: 2400,

    nav: [
      { id: 'home',         i18n: 'nav.home' },
      { id: 'about',        i18n: 'nav.about' },
      { id: 'education',    i18n: 'nav.education' },
      { id: 'skills',       i18n: 'nav.skills' },
      { id: 'projects',     i18n: 'nav.projects' },
      { id: 'certificates', i18n: 'nav.certificates' },
      { id: 'services',     i18n: 'nav.services' },
      { id: 'cv',           i18n: 'nav.cv' },
      { id: 'contact',      i18n: 'nav.contact' }
    ],

    homeMedia:  { type: 'image', src: 'profiles images/mele.jpg', alt: 'Melis Melakie profile' },
    aboutMedia: { type: 'image', src: 'profile images/meleb.jpg', alt: 'Working with data' },

    cv: {
      src: 'certificates/gebeya/product creation with AI_advanced level.pdf',
      fileName: 'Melis-Melakie-CV.pdf'
    },

    education: [
      { id: 'elementary', i18nTitle: 'edu.elementary.title', i18nSub: 'edu.elementary.sub', i18nDesc: 'edu.elementary.desc', i18nMeta: 'edu.elementary.meta', icon: 'fas fa-child-reaching', media: { type: 'none', src: '' } },
      { id: 'highschool', i18nTitle: 'edu.highschool.title', i18nSub: 'edu.highschool.sub', i18nDesc: 'edu.highschool.desc', i18nMeta: 'edu.highschool.meta', icon: 'fas fa-school', media: { type: 'image', src: 'profile images/meleb.jpg', alt: 'High school' } },
      { id: 'university', i18nTitle: 'edu.university.title', i18nSub: 'edu.university.sub', i18nDesc: 'edu.university.desc', i18nMeta: 'edu.university.meta', icon: 'fas fa-university', media: { type: 'video', src: 'project images/Best Funny People Falling Over Videos of The Week - Fail Unlucky (1080p, h264).mp4', alt: 'University' } },
      { id: 'online', i18nTitle: 'edu.online.title', i18nSub: 'edu.online.sub', i18nDesc: 'edu.online.desc', i18nMeta: 'edu.online.meta', icon: 'fas fa-laptop', media: { type: 'none', src: '' } }
    ],

    projects: [
      { i18nTitle: 'proj.churn.title', i18nDesc: 'proj.churn.desc', i18nTags: ['tag.python','tag.sklearn','tag.pandas'], github: 'https://github.com/', media: { type: 'image', src: 'project images/eep.png', alt: 'Churn analytics' } },
      { i18nTitle: 'proj.cnn.title', i18nDesc: 'proj.cnn.desc', i18nTags: ['tag.tensorflow','tag.keras','tag.cnn'], github: 'https://github.com/', media: { type: 'pdf', src: 'project images/Data analysis.pdf' } },
      { i18nTitle: 'proj.covid.title', i18nDesc: 'proj.covid.desc', i18nTags: ['tag.plotly','tag.pandas','tag.dataviz'], github: 'https://github.com/', media: { type: 'pdf', src: 'project images/Data analysis.pdf' } },
      { i18nTitle: 'proj.movie.title', i18nDesc: 'proj.movie.desc', i18nTags: ['tag.python','tag.surprise','tag.ml'], github: 'https://github.com/', media: { type: 'video', src: 'project images/Best Funny People Falling Over Videos of The Week - Fail Unlucky (1080p, h264).mp4' } },
      { i18nTitle: 'proj.sentiment.title', i18nDesc: 'proj.sentiment.desc', i18nTags: ['tag.nlp','tag.bert','tag.nltk'], github: 'https://github.com/', media: { type: 'video', src: 'project images/Best Funny People Falling Over Videos of The Week - Fail Unlucky (1080p, h264).mp4' } },
      { i18nTitle: 'proj.sales.title', i18nDesc: 'proj.sales.desc', i18nTags: ['tag.sql','tag.postgresql','tag.analytics'], github: 'https://github.com/', media: { type: 'image', src: 'project images/fake.png', alt: 'Sales analytics' } },
      { i18nTitle: 'proj.timeseries.title', i18nDesc: 'proj.timeseries.desc', i18nTags: ['tag.timeseries','tag.arima','tag.lstm'], github: 'https://github.com/', media: { type: 'image', src: 'project images/languages.png', alt: 'Time series' } },
      { i18nTitle: 'proj.fraud.title', i18nDesc: 'proj.fraud.desc', i18nTags: ['tag.anomaly','tag.ml','tag.python'], github: 'https://github.com/', media: { type: 'image', src: 'project images/camera.png', alt: 'Fraud detection' } }
    ],

    certificates: [
      { i18nTitle: 'cert.ml.title', i18nDesc: 'cert.ml.desc', provider: 'Udacity', category: 'udacity', icon: 'fas fa-brain', preview: { type: 'pdf', src: 'certificates/udacity/Programming fundamentals.pdf' }, link: '#' },
      { i18nTitle: 'cert.da.title', i18nDesc: 'cert.da.desc', provider: 'Udacity', category: 'udacity', icon: 'fas fa-chart-line', preview: { type: 'pdf', src: 'certificates/udacity/Data analysis.pdf' }, link: '#' },
      { i18nTitle: 'cert.ds.title', i18nDesc: 'cert.ds.desc', provider: 'Gebeya', category: 'gebeya', icon: 'fas fa-laptop-code', preview: { type: 'pdf', src: 'certificates/gebeya/AI essentials for Everyones.pdf' }, link: '#' },
      { i18nTitle: 'cert.cloud.title', i18nDesc: 'cert.cloud.desc', provider: 'Gebeya', category: 'gebeya', icon: 'fas fa-cloud', preview: { type: 'pdf', src: 'certificates/gebeya/cloud computing.pdf' }, link: '#' },
      { i18nTitle: 'cert.ds2.title', i18nDesc: 'cert.ds2.desc', provider: 'Gebeya', category: 'gebeya', icon: 'fas fa-laptop-code', preview: { type: 'pdf', src: 'certificates/gebeya/data science fundamentals.pdf' }, link: '#' },
      { i18nTitle: 'cert.entre.title', i18nDesc: 'cert.entre.desc', provider: 'Gebeya', category: 'gebeya', icon: 'fas fa-lightbulb', preview: { type: 'pdf', src: 'certificates/gebeya/Entrepreneurship.pdf' }, link: '#' },
      { i18nTitle: 'cert.entre.title', i18nDesc: 'cert.entre.desc', provider: 'Gebeya', category: 'gebeya', icon: 'fas fa-lightbulb', preview: { type: 'pdf', src: 'certificates/gebeya/language and communication skill.pdf' }, link: '#' },
      { i18nTitle: 'cert.entre.title', i18nDesc: 'cert.entre.desc', provider: 'Gebeya', category: 'gebeya', icon: 'fas fa-lightbulb', preview: { type: 'pdf', src: 'certificates/gebeya/Power BI.pdf' }, link: '#' },
      { i18nTitle: 'cert.entre.title', i18nDesc: 'cert.entre.desc', provider: 'Gebeya', category: 'gebeya', icon: 'fas fa-lightbulb', preview: { type: 'pdf', src: 'certificates/gebeya/product creation with AI_advanced level.pdf' }, link: '#' },
      { i18nTitle: 'cert.homl.title', i18nDesc: 'cert.homl.desc', provider: "O'Reilly", category: 'oreilly', icon: 'fas fa-robot', preview: { type: 'pdf', src: 'certificates/others/AI Security & Ethics.pdf' }, link: '#' },
      { i18nTitle: 'cert.de.title', i18nDesc: 'cert.de.desc', provider: "O'Reilly", category: 'oreilly', icon: 'fas fa-database', preview: { type: 'pdf', src: 'certificates/oreilly/CHAT GPT engineering.pdf' }, link: '#' },
      { i18nTitle: 'cert.homl.title', i18nDesc: 'cert.homl.desc', provider: "O'Reilly", category: 'oreilly', icon: 'fas fa-robot', preview: { type: 'pdf', src: 'certificates/oreilly/cloud computing with aws.pdf' }, link: '#' },
      { i18nTitle: 'cert.de.title', i18nDesc: 'cert.de.desc', provider: "O'Reilly", category: 'oreilly', icon: 'fas fa-database', preview: { type: 'pdf', src: 'certificates/oreilly/Python A-Z_ 15 Projects.pdf' }, link: '#' },
      { i18nTitle: 'cert.homl.title', i18nDesc: 'cert.homl.desc', provider: "O'Reilly", category: 'oreilly', icon: 'fas fa-robot', preview: { type: 'pdf', src: 'certificates/oreilly/Data Science & ML A to Z.pdf' }, link: '#' },
      { i18nTitle: 'cert.de.title', i18nDesc: 'cert.de.desc', provider: "O'Reilly", category: 'oreilly', icon: 'fas fa-database', preview: { type: 'pdf', src: 'certificates/oreilly/Digital marketing analytics.pdf' }, link: '#' },
      { i18nTitle: 'cert.homl.title', i18nDesc: 'cert.homl.desc', provider: "O'Reilly", category: 'oreilly', icon: 'fas fa-robot', preview: { type: 'pdf', src: 'certificates/oreilly/ML in python for Everyones.pdf' }, link: '#' },
      { i18nTitle: 'cert.de.title', i18nDesc: 'cert.de.desc', provider: "O'Reilly", category: 'oreilly', icon: 'fas fa-database', preview: { type: 'pdf', src: 'certificates/oreilly/ML Projects_ Beginner to Pro.pdf' }, link: '#' },
      { i18nTitle: 'cert.homl.title', i18nDesc: 'cert.homl.desc', provider: "O'Reilly", category: 'oreilly', icon: 'fas fa-robot', preview: { type: 'pdf', src: 'certificates/oreilly/ML, Data Science & GenAI.pdf' }, link: '#' },
      { i18nTitle: 'cert.de.title', i18nDesc: 'cert.de.desc', provider: "O'Reilly", category: 'oreilly', icon: 'fas fa-database', preview: { type: 'pdf', src: 'certificates/oreilly/Power BI Masterclass.pdf' }, link: '#' },
      { i18nTitle: 'cert.social.title', i18nDesc: 'cert.social.desc', provider: 'Demera Project', category: 'demera', icon: 'fas fa-hands-holding-heart', preview: { type: 'pdf', src: 'certificates/demera/Improving Machine Learning Models.pdf' }, link: '#' },
      { i18nTitle: 'cert.community.title', i18nDesc: 'cert.community.desc', provider: 'Demera Project', category: 'demera', icon: 'fas fa-users', preview: { type: 'image', src: 'certificates/demera/machine learning specialist.png', alt: 'Community Analytics' }, link: '#' },
      { i18nTitle: 'cert.social.title', i18nDesc: 'cert.social.desc', provider: 'Demera Project', category: 'demera', icon: 'fas fa-hands-holding-heart', preview: { type: 'pdf', src: 'certificates/demera/Data Visualization Basics.pdf' }, link: '#' },
      { i18nTitle: 'cert.community.title', i18nDesc: 'cert.community.desc', provider: 'Demera Project', category: 'demera', icon: 'fas fa-users', preview: { type: 'pdf', src: 'certificates/demera/Improving Machine Learning Models.pdf' }, link: '#' },
      { i18nTitle: 'cert.social.title', i18nDesc: 'cert.social.desc', provider: 'Demera Project', category: 'demera', icon: 'fas fa-hands-holding-heart', preview: { type: 'image', src: 'certificates/demera/machine learning pipelines.png' }, link: '#' },
      { i18nTitle: 'cert.community.title', i18nDesc: 'cert.community.desc', provider: 'Demera Project', category: 'demera', icon: 'fas fa-users', preview: { type: 'image', src: 'certificates/demera/principle of data privacy.png' }, link: '#' },
      { i18nTitle: 'cert.sqladv.title', i18nDesc: 'cert.sqladv.desc', provider: 'Kenexio', category: 'kenexio', icon: 'fas fa-database', preview: { type: 'pdf', src: 'certificates/kenexio/Programming fundamentals.pdf' }, link: '#' },
      { i18nTitle: 'cert.pbi.title', i18nDesc: 'cert.pbi.desc', provider: 'Kenexio', category: 'kenexio', icon: 'fas fa-chart-pie', preview: { type: 'none', src: '' }, link: '#' },
      { i18nTitle: 'cert.clublead.title', i18nDesc: 'cert.clublead.desc', provider: 'Data Club', category: 'club', icon: 'fas fa-people-group', preview: { type: 'image', src: 'profile images/meleb.jpg', alt: 'Club Lead' }, link: '#' },
      { i18nTitle: 'cert.hack.title', i18nDesc: 'cert.hack.desc', provider: 'Tech Club', category: 'club', icon: 'fas fa-trophy', preview: { type: 'pdf', src: 'certificates/club/Artificial intelligence.pdf' }, link: '#' },
      { i18nTitle: 'cert.dean.title', i18nDesc: 'cert.dean.desc', provider: 'University', category: 'recognition', icon: 'fas fa-medal', preview: { type: 'image', src: 'profile images/meleb.jpg', alt: "Dean's List" }, link: '#' },
      { i18nTitle: 'cert.capstone.title', i18nDesc: 'cert.capstone.desc', provider: 'DS Department', category: 'recognition', icon: 'fas fa-award', preview: { type: 'pdf', src: 'certificates/recognition/Data analysis.pdf' }, link: '#' },
      { i18nTitle: 'cert.google.title', i18nDesc: 'cert.google.desc', provider: 'Google', category: 'other', icon: 'fas fa-certificate', preview: { type: 'pdf', src: 'certificates/others/udara-certificate.pdf' }, link: '#' },
      { i18nTitle: 'cert.dl.title', i18nDesc: 'cert.dl.desc', provider: 'DeepLearning.AI', category: 'other', icon: 'fas fa-network-wired', preview: { type: 'pdf', src: 'certificates/others/Job Roles in the Cloud.pdf' }, link: '#' }
    ],

    certCategories: [
      { key: 'oreilly',     i18nLabel: 'certcat.oreilly',     icon: 'fas fa-book' },
      { key: 'demera',      i18nLabel: 'certcat.demera',      icon: 'fas fa-hands-holding-heart' },
      { key: 'gebeya',      i18nLabel: 'certcat.gebeya',      icon: 'fas fa-laptop-code' },
      { key: 'kenexio',     i18nLabel: 'certcat.kenexio',     icon: 'fas fa-briefcase' },
      { key: 'club',        i18nLabel: 'certcat.club',        icon: 'fas fa-people-group' },
      { key: 'udacity',     i18nLabel: 'certcat.udacity',     icon: 'fas fa-graduation-cap' },
      { key: 'recognition', i18nLabel: 'certcat.recognition', icon: 'fas fa-trophy' },
      { key: 'other',       i18nLabel: 'certcat.other',       icon: 'fas fa-certificate' }
    ],

    services: [
      { id: 'srv1', i18nJob: 'srv1.job', i18nCompany: 'srv1.company', i18nDuration: 'srv1.duration', i18nDesc: 'srv1.desc', i18nTags: ['srv1.tag1','srv1.tag2','srv1.tag3','srv1.tag4'], category: 'data-analysis', icon: 'fas fa-chart-bar' },
      { id: 'srv2', i18nJob: 'srv2.job', i18nCompany: 'srv2.company', i18nDuration: 'srv2.duration', i18nDesc: 'srv2.desc', i18nTags: ['srv2.tag1','srv2.tag2','srv2.tag3'], category: 'ml', icon: 'fas fa-brain' },
      { id: 'srv3', i18nJob: 'srv3.job', i18nCompany: 'srv3.company', i18nDuration: 'srv3.duration', i18nDesc: 'srv3.desc', i18nTags: ['srv3.tag1','srv3.tag2','srv3.tag3'], category: 'dataviz', icon: 'fas fa-chart-pie' },
      { id: 'srv4', i18nJob: 'srv4.job', i18nCompany: 'srv4.company', i18nDuration: 'srv4.duration', i18nDesc: 'srv4.desc', i18nTags: ['srv4.tag1','srv4.tag2','srv4.tag3'], category: 'consulting', icon: 'fas fa-lightbulb' },
      { id: 'srv5', i18nJob: 'srv5.job', i18nCompany: 'srv5.company', i18nDuration: 'srv5.duration', i18nDesc: 'srv5.desc', i18nTags: ['srv5.tag1','srv5.tag2','srv5.tag3'], category: 'training', icon: 'fas fa-chalkboard-user' }
    ],

    srvCategories: [
      { key: 'data-analysis', i18nLabel: 'srvcat.data-analysis', icon: 'fas fa-chart-bar' },
      { key: 'ml',            i18nLabel: 'srvcat.ml',            icon: 'fas fa-brain' },
      { key: 'dataviz',       i18nLabel: 'srvcat.dataviz',       icon: 'fas fa-chart-pie' },
      { key: 'consulting',    i18nLabel: 'srvcat.consulting',    icon: 'fas fa-lightbulb' },
      { key: 'training',      i18nLabel: 'srvcat.training',      icon: 'fas fa-chalkboard-user' }
    ],

    skills: [
      { i18nName: 'skill.python',     icon: 'fab fa-python',          category: 'programming', i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.r',          icon: 'fab fa-r-project',       category: 'programming', i18nLevel: 'lvl.intermediate' },
      { i18nName: 'skill.sql',        icon: 'fas fa-database',        category: 'programming', i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.javascript', icon: 'fab fa-js',              category: 'programming', i18nLevel: 'lvl.intermediate' },
      { i18nName: 'skill.java',       icon: 'fab fa-java',            category: 'programming', i18nLevel: 'lvl.basic' },
      { i18nName: 'skill.pandas',     icon: 'fas fa-table',           category: 'datasci',     i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.numpy',      icon: 'fas fa-calculator',      category: 'datasci',     i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.sklearn',    icon: 'fas fa-brain',           category: 'datasci',     i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.tensorflow', icon: 'fas fa-project-diagram', category: 'datasci',     i18nLevel: 'lvl.intermediate' },
      { i18nName: 'skill.matplotlib', icon: 'fas fa-chart-bar',       category: 'datasci',     i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.statistics', icon: 'fas fa-chart-area',      category: 'datasci',     i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.nlp',        icon: 'fas fa-language',        category: 'datasci',     i18nLevel: 'lvl.intermediate' },
      { i18nName: 'skill.git',        icon: 'fab fa-git-alt',         category: 'tools',       i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.jupyter',    icon: 'fas fa-flask',           category: 'tools',       i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.tableau',    icon: 'fas fa-chart-pie',       category: 'tools',       i18nLevel: 'lvl.intermediate' },
      { i18nName: 'skill.excel',      icon: 'fas fa-file-excel',      category: 'tools',       i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.docker',     icon: 'fab fa-docker',          category: 'tools',       i18nLevel: 'lvl.basic' },
      { i18nName: 'skill.aws',        icon: 'fas fa-cloud',           category: 'tools',       i18nLevel: 'lvl.basic' },
      { i18nName: 'skill.communication', icon: 'fas fa-comments',        category: 'soft', i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.teamwork',      icon: 'fas fa-people-group',    category: 'soft', i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.problem',       icon: 'fas fa-lightbulb',       category: 'soft', i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.time',          icon: 'fas fa-clock',           category: 'soft', i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.critical',      icon: 'fas fa-brain',           category: 'soft', i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.presentation',  icon: 'fas fa-chalkboard-user', category: 'soft', i18nLevel: 'lvl.intermediate' }
    ],

    skillsCategories: [
      { key: 'programming', i18nLabel: 'cat.programming', icon: 'fas fa-code' },
      { key: 'datasci',     i18nLabel: 'cat.datasci',     icon: 'fas fa-brain' },
      { key: 'tools',       i18nLabel: 'cat.tools',       icon: 'fas fa-screwdriver-wrench' },
      { key: 'soft',        i18nLabel: 'cat.soft',        icon: 'fas fa-handshake' }
    ],

    social: [
      { name: 'LinkedIn',  icon: 'fab fa-linkedin-in',    url: 'https://linkedin.com/in/', cls: 'linkedin' },
      { name: 'GitHub',    icon: 'fab fa-github',         url: 'https://github.com/',      cls: 'github' },
      { name: 'Telegram',  icon: 'fab fa-telegram-plane', url: 'https://t.me/',            cls: 'telegram' },
      { name: 'WhatsApp',  icon: 'fab fa-whatsapp',       url: 'https://wa.me/',           cls: 'whatsapp' },
      { name: 'Facebook',  icon: 'fab fa-facebook-f',     url: 'https://facebook.com/',    cls: 'facebook' },
      { name: 'Instagram', icon: 'fab fa-instagram',      url: 'https://instagram.com/',   cls: 'instagram' },
      { name: 'Discord',   icon: 'fab fa-discord',        url: 'https://discord.com/',     cls: 'discord' },
      { name: 'Pinterest', icon: 'fab fa-pinterest-p',    url: 'https://pinterest.com/',   cls: 'pinterest' },
      { name: 'Twitter/X', icon: 'fab fa-x-twitter',      url: 'https://x.com/',           cls: 'twitter' },
      { name: 'Reddit',    icon: 'fab fa-reddit-alien',   url: 'https://reddit.com/',      cls: 'reddit' }
    ]
  };

  /* ============================================================
     LOCAL STORAGE
     ============================================================ */
  const STORAGE_KEYS = {
    visitors: 'portfolio-visitor-count',
    ratings: 'portfolio-ratings',
    rated: 'portfolio-has-rated'
  };
  function getVisitorCount() {
    const n = parseInt(localStorage.getItem(STORAGE_KEYS.visitors) || '0', 10);
    return isNaN(n) ? 0 : n;
  }
  function incrementVisitorCount() {
    if (!sessionStorage.getItem('portfolio-session-counted')) {
      localStorage.setItem(STORAGE_KEYS.visitors, String(getVisitorCount() + 1));
      sessionStorage.setItem('portfolio-session-counted', '1');
    }
  }
  function getRatings() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.ratings) || '[]'); }
    catch (e) { return []; }
  }
  function saveRatings(arr) { localStorage.setItem(STORAGE_KEYS.ratings, JSON.stringify(arr)); }
  function hasRated() { return localStorage.getItem(STORAGE_KEYS.rated) === '1'; }
  function markRated() { localStorage.setItem(STORAGE_KEYS.rated, '1'); }

  /* ============================================================
     TRANSLATION
     ============================================================ */
  let currentLang = localStorage.getItem('portfolio-lang') || 'en';
  function t(key) {
    if (!key) return '';
    const dict = STRINGS[currentLang] || STRINGS.en;
    return dict[key] || STRINGS.en[key] || key;
  }

  /* ============================================================
     HELPERS
     ============================================================ */
  function normalizePath(rawPath) {
    if (!rawPath) return '';
    let p = String(rawPath).trim();
    if (/^(https?:|data:|blob:|file:)/i.test(p)) return p;
    p = p.replace(/\\/g, '/');
    p = p.replace(/\/{2,}/g, '/');
    return p;
  }

  /* ============================================================
     LIGHTBOX — instant open, no animation, no color flash
     ============================================================ */
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  const lightboxClose = document.getElementById('lightboxClose');

  let savedScrollY = 0;
  let locked = false;

  function lockScroll() {
    if (locked) return;
    locked = true;
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', sbw + 'px');
    savedScrollY = window.scrollY || window.pageYOffset || 0;
    document.body.style.paddingRight = sbw + 'px';
    document.body.style.top = -savedScrollY + 'px';
    document.body.classList.add('lightbox-open');
  }
  function unlockScroll() {
    if (!locked) return;
    locked = false;
    document.body.classList.remove('lightbox-open');
    document.body.style.top = '';
    document.body.style.paddingRight = '';
    window.scrollTo(0, savedScrollY);
  }

  function openLightbox(media) {
    if (!media || !media.src) return;
    lockScroll();
    const src = normalizePath(media.src);
    lightboxContent.innerHTML = '';

    if (media.type === 'pdf') {
      const iframe = document.createElement('iframe');
      iframe.src = src + '#toolbar=1&navpanes=0&scrollbar=1&view=FitH';
      iframe.title = 'PDF full view';
      iframe.style.cssText =
        'width:90vw;height:90vh;max-width:1400px;border:none;display:block;background:#fff;';
      lightboxContent.appendChild(iframe);
    } else if (media.type === 'video') {
      const video = document.createElement('video');
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'auto';
      lightboxContent.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = src;
      img.alt = media.alt || 'Media';
      img.decoding = 'async';
      lightboxContent.appendChild(img);
    }
    lightbox.classList.add('open');
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxContent.innerHTML = '';
    unlockScroll();
  }

  lightboxClose.addEventListener('click', function (e) { e.stopPropagation(); closeLightbox(); });
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox || e.target === lightboxContent) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });

  /* ============================================================
     RENDER MEDIA
     ============================================================ */
  function renderMediaInto(container, media, opts) {
    opts = opts || {};
    container.innerHTML = '';
    container.classList.remove('media-ready');

    if (!media || !media.src) {
      if (opts.showEmpty) {
        const empty = document.createElement('div');
        empty.className = opts.emptyClass || 'media-empty';
        empty.innerHTML = '<i class="fas fa-image"></i><span>' +
                          (opts.emptyLabel || t('media.noImage')) + '</span>';
        container.appendChild(empty);
      }
      container.style.cursor = 'default';
      container.onclick = null;
      container.classList.add('media-ready');
      return;
    }

    let type = (media.type || 'image').toLowerCase();
    if (type === 'vedio') type = 'video';

    const src = asset(normalizePath(media.src));

    container.style.cursor = 'zoom-in';
    container.onclick = function (e) {
      e.stopPropagation();
      openLightbox({ type: type, src: src, alt: media.alt });
    };

    function showError(icon) {
      container.classList.add('media-ready');
      const box = document.createElement('div');
      box.className = 'media-error-box';
      box.innerHTML = '<i class="fas ' + (icon || 'fa-image') + '"></i><span>' +
                      (opts.emptyLabel || t('media.noImage')) + '</span>';
      container.appendChild(box);
    }

    if (type === 'pdf') {
      const iframe = document.createElement('iframe');
      iframe.src = src + '#toolbar=0&navpanes=0&scrollbar=0&view=FitH';
      iframe.title = 'PDF preview';
      iframe.setAttribute('loading', 'eager');
      iframe.onload = function () { container.classList.add('media-ready'); };
      iframe.onerror = function () { showError('fa-file-pdf'); };
      container.appendChild(iframe);
      setTimeout(function () { container.classList.add('media-ready'); }, 1200);
      return;
    }

    if (type === 'video') {
      const video = document.createElement('video');
      video.autoplay = true; video.muted = true; video.loop = true;
      video.playsInline = true; video.preload = 'auto';
      if (media.poster) video.poster = asset(normalizePath(media.poster));
      const source = document.createElement('source');
      source.src = src; source.type = 'video/mp4';
      video.appendChild(source);
      video.addEventListener('loadeddata', function () { container.classList.add('media-ready'); });
      video.addEventListener('canplay', function () { container.classList.add('media-ready'); });
      video.onerror = function () { showError('fa-video'); };
      container.appendChild(video);
      setTimeout(function () { container.classList.add('media-ready'); }, 1200);
      return;
    }

    const img = document.createElement('img');
    img.src = src;
    img.alt = media.alt || '';
    img.decoding = 'async';
    img.loading = 'eager';
    img.width = 600; img.height = 400;
    img.addEventListener('load', function () {
      img.classList.add('loaded');
      container.classList.add('media-ready');
    });
    img.addEventListener('error', function () { showError('fa-image'); });
    container.appendChild(img);
    setTimeout(function () {
      if (!container.classList.contains('media-ready')) {
        img.classList.add('loaded');
        container.classList.add('media-ready');
      }
    }, 1200);
  }

  /* ============================================================
     JOB TITLE ROTATOR
     ============================================================ */
  let rotatorTimer = null;
  let rotatorIndex = 0;

  function startJobRotator() {
    const el = document.getElementById('jobRotator');
    if (!el) return;
    if (rotatorTimer) clearInterval(rotatorTimer);

    const titles = (CONFIG.jobTitles[currentLang] && CONFIG.jobTitles[currentLang].length)
      ? CONFIG.jobTitles[currentLang]
      : CONFIG.jobTitles.en;

    rotatorIndex = 0;
    el.textContent = titles[0];
    el.classList.remove('fade-out');
    el.classList.add('fade-in');

    rotatorTimer = setInterval(function () {
      el.classList.remove('fade-in');
      el.classList.add('fade-out');
      setTimeout(function () {
        rotatorIndex = (rotatorIndex + 1) % titles.length;
        el.textContent = titles[rotatorIndex];
        el.classList.remove('fade-out');
        el.classList.add('fade-in');
      }, 320);
    }, CONFIG.jobRotateInterval);
  }

  /* ============================================================
     RENDERERS
     ============================================================ */
  function renderNav() {
    const ul = document.getElementById('navLinks');
    if (!ul) return;
    ul.innerHTML = '';
    CONFIG.nav.forEach(function (item) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#' + item.id;
      a.textContent = t(item.i18n);
      a.dataset.navId = item.id;
      li.appendChild(a);
      ul.appendChild(li);
    });
  }

  function renderHomeMedia() {
    const c = document.getElementById('homeMedia');
    if (c) renderMediaInto(c, CONFIG.homeMedia, {});
  }
  function renderAboutMedia() {
    const c = document.getElementById('aboutMedia');
    if (c) renderMediaInto(c, CONFIG.aboutMedia, {});
  }

  /* PROJECTS */
  let projectsExpanded = false;
  let projectsRendered = 0;

  function buildProjectCard(p) {
    const card = document.createElement('div');
    card.className = 'project-card';

    const mediaEl = document.createElement('div');
    mediaEl.className = 'project-media';
    renderMediaInto(mediaEl, p.media, {
      showEmpty: true, emptyClass: 'media-empty', emptyLabel: t('media.noImage')
    });

    const body = document.createElement('div');
    body.className = 'project-body';

    const titleEl = document.createElement('h3');
    titleEl.textContent = t(p.i18nTitle);

    const descEl = document.createElement('p');
    descEl.className = 'project-desc';
    descEl.textContent = t(p.i18nDesc);

    const tagsEl = document.createElement('div');
    tagsEl.className = 'project-tags';
    (p.i18nTags || []).forEach(function (tagKey) {
      const span = document.createElement('span');
      span.className = 'tag';
      span.textContent = t(tagKey);
      tagsEl.appendChild(span);
    });

    const linkEl = document.createElement('a');
    linkEl.href = p.github || '#';
    linkEl.target = '_blank'; linkEl.rel = 'noopener noreferrer';
    linkEl.className = 'project-link';
    linkEl.innerHTML = t('projects.github') + ' <i class="fab fa-github"></i>';
    if (!p.github) linkEl.style.display = 'none';

    body.appendChild(titleEl); body.appendChild(descEl);
    body.appendChild(tagsEl); body.appendChild(linkEl);
    card.appendChild(mediaEl); card.appendChild(body);
    return card;
  }

  function renderProjectsTotal() {
    const badge = document.getElementById('projectsTotalCount');
    if (badge) badge.textContent = CONFIG.projects.length;
  }

  function updateProjectsBtn() {
    const btn = document.getElementById('projectsViewMoreBtn');
    if (!btn) return;
    if (projectsExpanded) {
      btn.innerHTML = '<span>' + t('projects.viewLess') +
                      '</span><i class="fas fa-chevron-down"></i>';
      btn.setAttribute('data-expanded', 'true');
    } else {
      btn.innerHTML = '<span>' + t('projects.viewMore') +
                      '</span><i class="fas fa-chevron-down"></i>';
      btn.setAttribute('data-expanded', 'false');
    }
  }

  function renderProjects() {
    const container = document.getElementById('projectsContainer');
    const wrap = document.getElementById('projectsViewMoreWrap');
    if (!container) return;
    container.innerHTML = '';
    projectsRendered = 0;
    projectsExpanded = false;

    const initial = Math.min(CONFIG.projectsInitialCount || 5, CONFIG.projects.length);
    for (let i = 0; i < initial; i++) {
      container.appendChild(buildProjectCard(CONFIG.projects[i]));
      projectsRendered++;
    }
    if (wrap) wrap.style.display = (CONFIG.projects.length > initial) ? 'block' : 'none';
    updateProjectsBtn();
    renderProjectsTotal();
  }

  function toggleProjects() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;
    const total = CONFIG.projects.length;
    const initial = Math.min(CONFIG.projectsInitialCount || 5, total);

    if (!projectsExpanded) {
      for (let i = projectsRendered; i < total; i++) {
        container.appendChild(buildProjectCard(CONFIG.projects[i]));
      }
      projectsRendered = total;
      projectsExpanded = true;
    } else {
      container.querySelectorAll('.project-card').forEach(function (c, idx) {
        if (idx >= initial) c.classList.add('hidden');
      });
      projectsExpanded = false;
    }
    updateProjectsBtn();
  }

  function initProjectsViewMore() {
    const btn = document.getElementById('projectsViewMoreBtn');
    if (!btn) return;
    btn.addEventListener('click', function () { toggleProjects(); });
  }

  /* SKILLS */
  let currentSkillCategory = null;
  let skillsExpanded = false;
  let skillsRendered = 0;

  function buildSkillCard(skill) {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.innerHTML =
      '<i class="' + skill.icon + '"></i>' +
      '<span>' + t(skill.i18nName) + '</span>' +
      '<span class="skill-level">' + t(skill.i18nLevel) + '</span>';
    return card;
  }

  function updateSkillsBtn() {
    const btn = document.getElementById('skillsViewMoreBtn');
    if (!btn) return;
    if (skillsExpanded) {
      btn.innerHTML = '<span>' + t('projects.viewLess') +
                      '</span><i class="fas fa-chevron-down"></i>';
      btn.setAttribute('data-expanded', 'true');
    } else {
      btn.innerHTML = '<span>' + t('projects.viewMore') +
                      '</span><i class="fas fa-chevron-down"></i>';
      btn.setAttribute('data-expanded', 'false');
    }
  }

  function renderSkillFilterButtons() {
    const bar = document.getElementById('skillsFilterBar');
    if (!bar) return;
    bar.innerHTML = '';
    CONFIG.skillsCategories.forEach(function (cat, index) {
      const btn = document.createElement('button');
      btn.className = 'filter-btn' + (index === 0 ? ' active' : '');
      btn.dataset.category = cat.key;
      btn.innerHTML = '<i class="' + cat.icon + '"></i> <span>' + t(cat.i18nLabel) + '</span>';
      btn.addEventListener('click', function () {
        currentSkillCategory = cat.key;
        bar.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        renderSkills(cat.key);
      });
      bar.appendChild(btn);
    });
    if (CONFIG.skillsCategories.length > 0) {
      currentSkillCategory = CONFIG.skillsCategories[0].key;
      renderSkills(currentSkillCategory);
    }
  }

  function renderSkills(category) {
    const grid = document.getElementById('skillsGrid');
    const wrap = document.getElementById('skillsViewMoreWrap');
    if (!grid) return;
    grid.innerHTML = '';
    skillsRendered = 0;
    skillsExpanded = false;

    if (!category) {
      grid.innerHTML = '<div class="empty-state"><i class="fas fa-hand-pointer"></i>' +
                       t('skills.selectCategory') + '</div>';
      if (wrap) wrap.style.display = 'none';
      updateSkillsBtn();
      return;
    }
    const filtered = CONFIG.skills.filter(function (s) { return s.category === category; });
    if (filtered.length === 0) {
      grid.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i>' +
                       t('skills.empty') + '</div>';
      if (wrap) wrap.style.display = 'none';
      updateSkillsBtn();
      return;
    }
    const initial = Math.min(CONFIG.skillsInitialCount || 5, filtered.length);
    for (let i = 0; i < initial; i++) {
      grid.appendChild(buildSkillCard(filtered[i]));
      skillsRendered++;
    }
    if (wrap) wrap.style.display = (filtered.length > initial) ? 'block' : 'none';
    updateSkillsBtn();
  }

  function toggleSkills() {
    const grid = document.getElementById('skillsGrid');
    if (!grid || !currentSkillCategory) return;
    const filtered = CONFIG.skills.filter(function (s) { return s.category === currentSkillCategory; });
    const initial = Math.min(CONFIG.skillsInitialCount || 5, filtered.length);

    if (!skillsExpanded) {
      for (let i = skillsRendered; i < filtered.length; i++) {
        grid.appendChild(buildSkillCard(filtered[i]));
      }
      skillsRendered = filtered.length;
      skillsExpanded = true;
    } else {
      grid.querySelectorAll('.skill-card').forEach(function (c, idx) {
        if (idx >= initial) c.classList.add('hidden');
      });
      skillsExpanded = false;
    }
    updateSkillsBtn();
  }

  function initSkillsViewMore() {
    const btn = document.getElementById('skillsViewMoreBtn');
    if (!btn) return;
    btn.addEventListener('click', function () { toggleSkills(); });
  }

  /* CERTIFICATES */
  let currentCertCategory = null;
  let certsExpanded = false;
  let certsRendered = 0;

  function buildCertCard(cert) {
    const card = document.createElement('div');
    card.className = 'cert-card';

    const previewEl = document.createElement('div');
    previewEl.className = 'cert-preview';
    renderMediaInto(previewEl, cert.preview, {
      showEmpty: true, emptyClass: 'cert-preview-empty', emptyLabel: t('media.noPreview')
    });

    const top = document.createElement('div');
    top.className = 'cert-top';
    top.innerHTML =
      '<div class="cert-icon"><i class="' + cert.icon + '"></i></div>' +
      '<div>' +
        '<div class="cert-title">' + t(cert.i18nTitle) + '</div>' +
        '<div class="cert-provider">' + cert.provider + '</div>' +
      '</div>';

    const desc = document.createElement('p');
    desc.className = 'cert-desc';
    desc.textContent = t(cert.i18nDesc);

    const footer = document.createElement('div');
    footer.className = 'cert-footer';
    const verifyLink = document.createElement('a');
    verifyLink.href = cert.link || '#';
    verifyLink.target = '_blank'; verifyLink.rel = 'noopener noreferrer';
    verifyLink.className = 'cert-verify';
    verifyLink.innerHTML = t('certs.view') + ' <i class="fas fa-arrow-right"></i>';
    if (!cert.link || cert.link === '#') verifyLink.style.display = 'none';
    footer.appendChild(verifyLink);

    card.appendChild(previewEl); card.appendChild(top);
    card.appendChild(desc); card.appendChild(footer);
    return card;
  }

  function renderCertsTotal() {
    const badge = document.getElementById('certsTotalCount');
    if (badge) badge.textContent = CONFIG.certificates.length;
  }

  function updateCertsBtn() {
    const btn = document.getElementById('certsViewMoreBtn');
    if (!btn) return;
    if (certsExpanded) {
      btn.innerHTML = '<span>' + t('projects.viewLess') +
                      '</span><i class="fas fa-chevron-down"></i>';
      btn.setAttribute('data-expanded', 'true');
    } else {
      btn.innerHTML = '<span>' + t('projects.viewMore') +
                      '</span><i class="fas fa-chevron-down"></i>';
      btn.setAttribute('data-expanded', 'false');
    }
  }

  function renderCertFilterButtons() {
    const bar = document.getElementById('certsFilterBar');
    if (!bar) return;
    bar.innerHTML = '';
    CONFIG.certCategories.forEach(function (cat, index) {
      const count = CONFIG.certificates.filter(function (c) { return c.category === cat.key; }).length;
      const btn = document.createElement('button');
      btn.className = 'filter-btn' + (index === 0 ? ' active' : '');
      btn.dataset.category = cat.key;
      btn.innerHTML =
        '<i class="' + cat.icon + '"></i> <span>' + t(cat.i18nLabel) + '</span>' +
        '<span class="count-badge">' + count + '</span>';
      btn.addEventListener('click', function () {
        currentCertCategory = cat.key;
        bar.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        renderCertificates(cat.key);
      });
      bar.appendChild(btn);
    });
    if (CONFIG.certCategories.length > 0) {
      currentCertCategory = CONFIG.certCategories[0].key;
      renderCertificates(currentCertCategory);
    }
  }

  function renderCertificates(category) {
    const grid = document.getElementById('certificatesGrid');
    const wrap = document.getElementById('certsViewMoreWrap');
    if (!grid) return;
    grid.innerHTML = '';
    certsRendered = 0;
    certsExpanded = false;

    if (!category) {
      grid.innerHTML = '<div class="empty-state"><i class="fas fa-hand-pointer"></i>' +
                       t('skills.selectCategory') + '</div>';
      if (wrap) wrap.style.display = 'none';
      updateCertsBtn();
      return;
    }
    const filtered = CONFIG.certificates.filter(function (c) { return c.category === category; });
    if (filtered.length === 0) {
      grid.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i>' +
                       t('certs.empty') + '</div>';
      if (wrap) wrap.style.display = 'none';
      updateCertsBtn();
      return;
    }
    const initial = Math.min(CONFIG.certsInitialCount || 3, filtered.length);
    for (let i = 0; i < initial; i++) {
      grid.appendChild(buildCertCard(filtered[i]));
      certsRendered++;
    }
    if (wrap) wrap.style.display = (filtered.length > initial) ? 'block' : 'none';
    updateCertsBtn();
  }

  function toggleCerts() {
    const grid = document.getElementById('certificatesGrid');
    if (!grid || !currentCertCategory) return;
    const filtered = CONFIG.certificates.filter(function (c) { return c.category === currentCertCategory; });
    const initial = Math.min(CONFIG.certsInitialCount || 3, filtered.length);

    if (!certsExpanded) {
      for (let i = certsRendered; i < filtered.length; i++) {
        grid.appendChild(buildCertCard(filtered[i]));
      }
      certsRendered = filtered.length;
      certsExpanded = true;
    } else {
      grid.querySelectorAll('.cert-card').forEach(function (c, idx) {
        if (idx >= initial) c.classList.add('hidden');
      });
      certsExpanded = false;
    }
    updateCertsBtn();
  }

  function initCertsViewMore() {
    const btn = document.getElementById('certsViewMoreBtn');
    if (!btn) return;
    btn.addEventListener('click', function () { toggleCerts(); });
  }

  /* SERVICES */
  let currentSrvCategory = null;
  let srvExpanded = false;
  let srvRendered = 0;

  function buildSrvCard(srv) {
    const card = document.createElement('div');
    card.className = 'srv-card';
    const tagHTML = (srv.i18nTags || []).map(function (k) {
      return '<span class="srv-tag">' + t(k) + '</span>';
    }).join('');
    card.innerHTML =
      '<div class="srv-header">' +
        '<div class="srv-logo"><i class="' + srv.icon + '"></i></div>' +
        '<div>' +
          '<div class="srv-title">' + t(srv.i18nJob) + '</div>' +
          '<div class="srv-company"><i class="fas fa-briefcase"></i> ' + t(srv.i18nCompany) + '</div>' +
        '</div>' +
      '</div>' +
      '<span class="srv-duration"><i class="fas fa-clock"></i> ' + t(srv.i18nDuration) + '</span>' +
      '<p class="srv-desc">' + t(srv.i18nDesc) + '</p>' +
      '<div class="srv-tags">' + tagHTML + '</div>';
    return card;
  }

  function updateSrvBtn() {
    const btn = document.getElementById('srvViewMoreBtn');
    if (!btn) return;
    if (srvExpanded) {
      btn.innerHTML = '<span>' + t('projects.viewLess') +
                      '</span><i class="fas fa-chevron-down"></i>';
      btn.setAttribute('data-expanded', 'true');
    } else {
      btn.innerHTML = '<span>' + t('projects.viewMore') +
                      '</span><i class="fas fa-chevron-down"></i>';
      btn.setAttribute('data-expanded', 'false');
    }
  }

  function renderSrvFilterButtons() {
    const bar = document.getElementById('srvFilterBar');
    if (!bar) return;
    bar.innerHTML = '';
    CONFIG.srvCategories.forEach(function (cat, index) {
      const count = CONFIG.services.filter(function (s) { return s.category === cat.key; }).length;
      const btn = document.createElement('button');
      btn.className = 'filter-btn' + (index === 0 ? ' active' : '');
      btn.dataset.category = cat.key;
      btn.innerHTML =
        '<i class="' + cat.icon + '"></i> <span>' + t(cat.i18nLabel) + '</span>' +
        '<span class="count-badge">' + count + '</span>';
      btn.addEventListener('click', function () {
        currentSrvCategory = cat.key;
        bar.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        renderServices(cat.key);
      });
      bar.appendChild(btn);
    });
    if (CONFIG.srvCategories.length > 0) {
      currentSrvCategory = CONFIG.srvCategories[0].key;
      renderServices(currentSrvCategory);
    }
  }

  function renderServices(category) {
    const grid = document.getElementById('servicesGrid');
    const wrap = document.getElementById('srvViewMoreWrap');
    if (!grid) return;
    grid.innerHTML = '';
    srvRendered = 0;
    srvExpanded = false;

    if (!category) {
      grid.innerHTML = '<div class="empty-state"><i class="fas fa-hand-pointer"></i>' +
                       t('skills.selectCategory') + '</div>';
      if (wrap) wrap.style.display = 'none';
      updateSrvBtn();
      return;
    }
    const filtered = CONFIG.services.filter(function (s) { return s.category === category; });
    if (filtered.length === 0) {
      grid.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i>' +
                       t('srv.empty') + '</div>';
      if (wrap) wrap.style.display = 'none';
      updateSrvBtn();
      return;
    }
    const initial = Math.min(CONFIG.srvInitialCount || 4, filtered.length);
    for (let i = 0; i < initial; i++) {
      grid.appendChild(buildSrvCard(filtered[i]));
      srvRendered++;
    }
    if (wrap) wrap.style.display = (filtered.length > initial) ? 'block' : 'none';
    updateSrvBtn();
  }

  function toggleServices() {
    const grid = document.getElementById('servicesGrid');
    if (!grid || !currentSrvCategory) return;
    const filtered = CONFIG.services.filter(function (s) { return s.category === currentSrvCategory; });
    const initial = Math.min(CONFIG.srvInitialCount || 4, filtered.length);

    if (!srvExpanded) {
      for (let i = srvRendered; i < filtered.length; i++) {
        grid.appendChild(buildSrvCard(filtered[i]));
      }
      srvRendered = filtered.length;
      srvExpanded = true;
    } else {
      grid.querySelectorAll('.srv-card').forEach(function (c, idx) {
        if (idx >= initial) c.classList.add('hidden');
      });
      srvExpanded = false;
    }
    updateSrvBtn();
  }

  function initSrvViewMore() {
    const btn = document.getElementById('srvViewMoreBtn');
    if (!btn) return;
    btn.addEventListener('click', function () { toggleServices(); });
  }

  /* EDUCATION */
  function renderEducation() {
    const grid = document.getElementById('educationGrid');
    if (!grid) return;
    grid.innerHTML = '';
    CONFIG.education.forEach(function (edu) {
      const card = document.createElement('div');
      card.className = 'edu-card';
      const header = document.createElement('div');
      header.className = 'edu-header';
      header.innerHTML =
        '<div class="edu-icon"><i class="' + edu.icon + '"></i></div>' +
        '<div>' +
          '<div class="edu-title">' + t(edu.i18nTitle) + '</div>' +
          '<div class="edu-sub">' + t(edu.i18nSub) + '</div>' +
        '</div>' +
        '<i class="fas fa-chevron-down edu-arrow"></i>';
      const body = document.createElement('div');
      body.className = 'edu-body';
      const p = document.createElement('p');
      p.textContent = t(edu.i18nDesc);
      body.appendChild(p);
      if (edu.media && edu.media.src) {
        const mediaWrap = document.createElement('div');
        mediaWrap.className = 'edu-media';
        renderMediaInto(mediaWrap, edu.media, {});
        body.appendChild(mediaWrap);
      }
      if (edu.i18nMeta) {
        const meta = document.createElement('div');
        meta.className = 'edu-meta';
        meta.innerHTML = '<i class="fas fa-calendar-alt"></i> ' + t(edu.i18nMeta);
        body.appendChild(meta);
      }
      card.appendChild(header);
      card.appendChild(body);
      header.addEventListener('click', function (e) {
        e.stopPropagation();
        const wasActive = card.classList.contains('active');
        grid.querySelectorAll('.edu-card').forEach(function (c) { c.classList.remove('active'); });
        if (!wasActive) card.classList.add('active');
      });
      grid.appendChild(card);
    });
  }

  /* SOCIAL / CV */
  function renderSocial() {
    const container = document.getElementById('socialIcons');
    if (!container) return;
    container.innerHTML = '';
    CONFIG.social.forEach(function (s) {
      const a = document.createElement('a');
      a.href = s.url; a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'social-icon ' + s.cls;
      a.setAttribute('aria-label', s.name);
      a.setAttribute('title', s.name);
      a.innerHTML = '<i class="' + s.icon + '"></i>';
      container.appendChild(a);
    });
  }

  function renderCVActions() {
    const openBtn = document.getElementById('cvOpenBtn');
    const dlBtn = document.getElementById('cvDownloadBtn');
    const src = CONFIG.cv.src;
    const fileName = CONFIG.cv.fileName;
    if (openBtn) {
      if (src) {
        openBtn.href = asset(normalizePath(src));
        openBtn.style.opacity = '1';
        openBtn.style.pointerEvents = 'auto';
      } else {
        openBtn.style.opacity = '0.5';
        openBtn.style.pointerEvents = 'none';
      }
    }
    if (dlBtn) {
      if (src) {
        dlBtn.href = asset(normalizePath(src));
        dlBtn.setAttribute('download', fileName || 'CV.pdf');
        dlBtn.style.opacity = '1';
        dlBtn.style.pointerEvents = 'auto';
      } else {
        dlBtn.style.opacity = '0.5';
        dlBtn.style.pointerEvents = 'none';
      }
    }
  }

  /* VISITOR / RATING */
  function initVisitorCounter() {
    incrementVisitorCount();
    const n = getVisitorCount();
    const el = document.getElementById('visitorCount');
    if (!el) return;
    let current = 0;
    const step = Math.max(1, Math.floor(n / 40));
    const timer = setInterval(function () {
      current += step;
      if (current >= n) { current = n; clearInterval(timer); }
      el.textContent = current.toLocaleString();
    }, 20);
  }
  function renderStarRow() {
    const row = document.getElementById('starRow');
    if (!row) return;
    row.innerHTML = '';
    const ratings = getRatings();
    const avg = ratings.length ? (ratings.reduce(function (a, b) { return a + b; }, 0) / ratings.length) : 0;
    const userRated = hasRated();
    for (let i = 1; i <= 5; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'star-btn';
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-label', i + ' star' + (i > 1 ? 's' : ''));
      btn.dataset.value = i;
      if (i <= Math.round(avg)) btn.classList.add('filled');
      btn.innerHTML = '<i class="fas fa-star"></i><span class="star-num">' + i + '</span>';
      if (!userRated) {
        btn.addEventListener('click', function () { submitRating(i); });
      } else {
        btn.style.cursor = 'default';
        btn.title = t('stats.alreadyRated');
      }
      row.appendChild(btn);
    }
    const avgEl = document.getElementById('avgRating');
    const cntEl = document.getElementById('ratingCount');
    if (avgEl) avgEl.textContent = avg.toFixed(1);
    if (cntEl) cntEl.textContent = ratings.length;
  }
  function submitRating(stars) {
    if (hasRated()) return;
    const arr = getRatings();
    arr.push(stars);
    saveRatings(arr);
    markRated();
    renderStarRow();
    showToast(t('stats.thanks'));
  }
  function showToast(msg) {
    let toast = document.getElementById('portfolio-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'portfolio-toast';
      toast.style.cssText =
        'position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(100px);' +
        'background:var(--text);color:var(--bg);padding:0.75rem 1.25rem;border-radius:2rem;' +
        'font-size:0.9rem;font-weight:600;z-index:99999;box-shadow:0 10px 30px rgba(0,0,0,0.35);' +
        'transition:transform 0.4s cubic-bezier(.2,.9,.3,1.2),opacity 0.3s;opacity:0;pointer-events:none;';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    requestAnimationFrame(function () {
      toast.style.transform = 'translateX(-50%) translateY(0)';
      toast.style.opacity = '1';
    });
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function () {
      toast.style.transform = 'translateX(-50%) translateY(100px)';
      toast.style.opacity = '0';
    }, 2400);
  }

  function applyTranslations() {
    document.body.classList.toggle('lang-am', currentLang === 'am');
    document.documentElement.lang = currentLang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });

    const langLabel = document.getElementById('langLabel');
    if (langLabel) langLabel.textContent = currentLang === 'en' ? 'EN' : 'አማ';

    renderNav();
    renderEducation();
    renderSkillFilterButtons();
    renderProjects();
    renderProjectsTotal();
    renderCertFilterButtons();
    renderCertsTotal();
    renderSrvFilterButtons();
    updateActiveNav();
    startJobRotator();
  }

  /* SCROLL / NAV */
  function initScrollReveal() {
    document.querySelectorAll('.section').forEach(function (s) { s.classList.add('visible'); });
  }
  function initSmoothAnchors() {
    document.addEventListener('click', function (e) {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top: top, behavior: 'smooth' });
        const navLinks = document.getElementById('navLinks');
        if (navLinks) navLinks.classList.remove('open');
        const menuToggle = document.getElementById('menuToggle');
        if (menuToggle) {
          const icon = menuToggle.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
  }
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const scrollPos = window.scrollY + 120;
    let currentId = '';
    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) currentId = section.getAttribute('id');
    });
    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.dataset.navId === currentId) link.classList.add('active');
    });
  }
  function initActiveNav() {
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    window.addEventListener('load', updateActiveNav);
  }
  function initThemeToggle() {
    const btn = document.getElementById('themeBtn');
    if (!btn) return;
    const icon = btn.querySelector('i');
    if (localStorage.getItem('portfolio-theme') === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      icon.classList.remove('fa-moon'); icon.classList.add('fa-sun');
    }
    btn.addEventListener('click', function () {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        icon.classList.remove('fa-sun'); icon.classList.add('fa-moon');
        localStorage.setItem('portfolio-theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon'); icon.classList.add('fa-sun');
        localStorage.setItem('portfolio-theme', 'dark');
      }
    });
  }
  function initLangToggle() {
    const btn = document.getElementById('langBtn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      currentLang = currentLang === 'en' ? 'am' : 'en';
      localStorage.setItem('portfolio-lang', currentLang);
      applyTranslations();
    });
  }
  function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (!toggle || !navLinks) return;
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      const icon = toggle.querySelector('i');
      if (navLinks.classList.contains('open')) {
        icon.classList.remove('fa-bars'); icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times'); icon.classList.add('fa-bars');
      }
    });
  }
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    if (!form) return;
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const name = document.getElementById('fromName').value.trim();
      const email = document.getElementById('fromEmail').value.trim();
      const message = document.getElementById('message').value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!name || !email || !message || !emailRegex.test(email)) {
        status.textContent = t('contact.error');
        status.className = 'form-status error';
        return;
      }
      if (typeof emailjs === 'undefined') {
        console.error('EmailJS library not loaded.');
        status.textContent = t('contact.serverError');
        status.className = 'form-status error';
        return;
      }
      status.textContent = t('contact.sending');
      status.className = 'form-status sending';
      submitBtn.disabled = true;
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + t('contact.sending');
      try {
        const templateParams = {
          from_name: name, from_email: email, message: message,
          name: name, email: email, user_name: name, user_email: email,
          reply_to: email, to_email: CONFIG.email,
          subject: 'New portfolio message from ' + name
        };
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, { publicKey: EMAILJS_PUBLIC_KEY });
        status.textContent = t('contact.success');
        status.className = 'form-status success';
        form.reset();
      } catch (error) {
        console.error('EmailJS error:', error);
        const detail = (error && (error.text || error.message)) || 'unknown';
        status.textContent = t('contact.serverError') + ' (' + detail + ')';
        status.className = 'form-status error';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        setTimeout(function () {
          if (status.classList.contains('success') || status.classList.contains('error')) {
            status.textContent = '';
            status.className = 'form-status';
          }
        }, 10000);
      }
    });
  }

  /* INIT */
  function init() {
    const PRIORITY = [
      '../profile images/meleb.jpg',
      '../profile images/mele.jpg',
      '../project images/eep.png'
    ];
    PRIORITY.forEach(function (u) {
      const l = document.createElement('link');
      l.rel = 'preload';
      l.as = 'image';
      l.href = u;
      l.fetchPriority = 'high';
      document.head.appendChild(l);
    });

    renderNav();
    renderHomeMedia();
    renderAboutMedia();
    renderEducation();
    renderSkillFilterButtons();
    renderProjects();
    renderProjectsTotal();
    renderCertFilterButtons();
    renderCertsTotal();
    renderSrvFilterButtons();
    renderSocial();
    renderCVActions();

    applyTranslations();

    document.addEventListener('error', function (e) {
      const el = e.target;
      if (el && (el.tagName === 'IMG' || el.tagName === 'VIDEO')) {
        el.classList.add('media-error');
      }
    }, true);

    initScrollReveal();
    initSmoothAnchors();
    initActiveNav();
    initThemeToggle();
    initLangToggle();
    initMobileMenu();
    initProjectsViewMore();
    initSkillsViewMore();
    initCertsViewMore();
    initSrvViewMore();
    initContactForm();
    initVisitorCounter();
    renderStarRow();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();