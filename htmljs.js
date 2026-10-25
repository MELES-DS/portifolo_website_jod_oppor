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
     PDF.js — loaded on demand
     ============================================================ */
  const PDFJS_URL        = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.min.mjs';
  const PDFJS_WORKER_URL = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs';

  let pdfjsPromise = null;
  function loadPdfJs() {
    if (!pdfjsPromise) {
      pdfjsPromise = import(PDFJS_URL).then(function (pdfjsLib) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
        return pdfjsLib;
      });
    }
    return pdfjsPromise;
  }

  function renderPdfPageToCanvas(pdf, pageNumber, scale) {
    return pdf.getPage(pageNumber).then(function (page) {
      const viewport = page.getViewport({ scale: scale || 1.5 });
      const canvas = document.createElement('canvas');
      canvas.width  = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.cssText = 'width:100%;height:auto;display:block;background:#fff;';
      const ctx = canvas.getContext('2d');
      return page.render({ canvasContext: ctx, viewport: viewport }).promise.then(function () {
        return canvas;
      });
    });
  }

  /* ============================================================
     🌍 TRANSLATIONS
     ============================================================ */
  const STRINGS = {
    en: {
      'brand': 'Portfolio',
      'nav.home': 'Home', 'nav.about': 'About Me', 'nav.education': 'Education',
      'nav.skills': 'Skills', 'nav.projects': 'Projects', 'nav.experience': 'Experience',
      'nav.certificates': 'Certificates', 'nav.services': 'Services',
      'nav.cv': 'CV', 'nav.contact': 'Contact',

      'home.title': 'Welcome Everyones', 'home.greet': "Hi, I'm", 'home.name': 'Melis Melakie',
      'home.desc': "I'm a passionate Data Science student interested in turning data into meaningful insights and practical solutions. I enjoy working with data, exploring patterns, analysing data, building machine learning models, develop data-driven applications and projects that solve real-world problems.",
      'home.viewProjects': 'View Projects', 'home.getInTouch': 'Get in Touch',

      'about.title': 'About Me',
      'about.academic': 'Academic Background',
      'about.academicDesc': 'Currently pursuing a B.Sc. in Data Science at Debre Berhan University, Ethiopia, with a focus on  Machine Learning, Artificial Intelligence, Deep Learning, Data Analytics ,computer vision, data visualization and statistics.',
      'about.career': 'Career Interests',
      'about.careerDesc': 'improving my technical and professional skills through academic projects, online training, certifications, practical experimentation and building data products that create real impact.',
      'about.goals': 'Professional Goals',
      'about.goalsDesc': 'To become a Data Scientist and AI/ML professional who ships end-to-end ML systems from data collection to deployment and contribute to technology-driven solutions that address real-world challenges.',

      'skills.title': 'Skills',
      'skills.subtitle': 'My core skills in Data Science, Machine Learning, Deep Learning, Artificial Intelligence, Data Analytics, and Data Visualization',
      'skills.empty': 'No skills found in this category.',
      'skills.selectCategory': 'Select a category above.',

      'cat.programming': '🐍 Programming',
      'cat.datasci': '📊 Data Science & Analytics',
      'cat.mlai': '🤖 Machine Learning & AI',
      'cat.tools': '🛠️ Tools & Platforms',
      'cat.soft': '💼 Soft Skills',
      'cat.other': '📦 Other Skills',

      'lvl.advanced': 'Advanced', 'lvl.intermediate': 'Intermediate', 'lvl.basic': 'Basic',

      'skill.python': 'Python', 'skill.r': 'R', 'skill.sql': 'SQL',
      'skill.java': 'Java', 'skill.javascript': 'JavaScript',
      'skill.htmlcss': 'HTML & CSS',

      'skill.dataclean': 'Data Cleaning & Preprocessing',
      'skill.eda': 'Data Analysis',
      'skill.statistical': 'Statistical Analysis',
      'skill.dataviz': 'Data Visualization',
      'skill.excel': 'Excel',
      'skill.powerbi': 'Power BI',
      'skill.pandas': 'Pandas',
      'skill.numpy': 'NumPy',
      'skill.matplotlib': 'Matplotlib',
      'skill.matlab': 'MATLAB',
      'skill.spss': 'SPSS',

      'skill.ml': 'Machine Learning',
      'skill.dl': 'Deep Learning',
      'skill.nlp': 'Natural Language Processing (NLP)',
      'skill.cv': 'Computer Vision',
      'skill.predictive': 'Predictive Modeling',
      'skill.modeleval': 'Model Evaluation',
      'skill.featureeng': 'Feature Engineering',
      'skill.tensorflow': 'TensorFlow',
      'skill.pytorch': 'PyTorch',
      'skill.sklearn': 'Scikit-learn',
      'skill.dashboard': 'Dashboard Development',

      'skill.jupyter': 'Jupyter Notebook',
      'skill.colab': 'Google Colab',
      'skill.kaggle': 'Kaggle',
      'skill.vscode': 'VS Code',
      'skill.git': 'Git',
      'skill.github': 'GitHub',
      'skill.gradio': 'Gradio',
      'skill.streamlit': 'Streamlit',

      'skill.problem': 'Problem Solving',
      'skill.critical': 'Critical Thinking',
      'skill.teamwork': 'Teamwork & Collaboration',
      'skill.communication': 'Communication',
      'skill.presentation': 'Presentation',
      'skill.projectmgmt': 'Project Management',
      'skill.time': 'Time Management',
      'skill.learning': 'Continuous Learning',

      'skill.cloud': 'Cloud Platforms',
      'skill.databases': 'Databases',
      'skill.qc': 'Quality Control',

      'projects.title': 'Projects',
      'projects.subtitle': 'Explore my academic and practical projects, where I apply Data Science, Machine Learning, Deep Learning, AI, and data analytics to solve real-world problems.',
      'projects.github': 'GitHub',
      'projects.liveDemo': 'Live Demo',
      'projects.viewDetails': 'View Details',
      'projects.viewMore': 'View More', 'projects.viewLess': 'View Less',

      'proj.sentiment.title': 'Positive & Negative Sentiment Classification',
      'proj.sentiment.desc': 'A natural language processing (NLP) project designed to classify text sentences as positive or negative based on their expressed sentiment.',

      'proj.translation.title': 'Five Ethiopian Languages ↔ English Bidirectional Translation',
      'proj.translation.desc': 'A multilingual machine-translation project designed to provide bidirectional translation between English and five Ethiopian languages.',

      'proj.water.title': 'Water Level Forecasting for 14 Ethiopian Hydropower Plants',
      'proj.water.desc': 'A machine-learning-based forecasting project designed to predict water levels for 14 Ethiopian hydropower plants using historical water-level and related time-series data.',

      'proj.aiimage.title': 'Real vs AI-Generated Human Image Detection',
      'proj.aiimage.desc': 'A deep-learning-based computer vision project designed to classify human images as either real or AI-generated.',

      'proj.diabetes.title': 'Diabetes Prediction Using Machine Learning',
      'proj.diabetes.desc': 'A machine-learning project designed to predict the likelihood of diabetes based on selected health and demographic attributes from a diabetes dataset.',

      'proj.weather.title': 'Weather Condition Analysis & Prediction',
      'proj.weather.desc': 'A data science and machine-learning project focused on analyzing weather conditions and predicting weather-related outcomes using historical weather data.',

      'proj.youth.title': 'DIY Youth Center Attendance Analysis & Reporting Dashboard',
      'proj.youth.desc': 'An interactive attendance analysis and reporting dashboard developed for a DIY Youth Center to transform attendance records into meaningful statistics, visualizations, and reports.',

      'tag.python': 'Python', 'tag.sklearn': 'Scikit-learn', 'tag.pandas': 'Pandas',
      'tag.tensorflow': 'TensorFlow', 'tag.keras': 'Keras', 'tag.cnn': 'CNN',
      'tag.plotly': 'Plotly', 'tag.dataviz': 'Data Viz',
      'tag.surprise': 'Surprise', 'tag.ml': 'ML',
      'tag.nlp': 'NLP', 'tag.bert': 'BERT', 'tag.nltk': 'NLTK',
      'tag.sql': 'SQL', 'tag.postgresql': 'PostgreSQL', 'tag.analytics': 'Analytics',
      'tag.timeseries': 'Time Series', 'tag.arima': 'ARIMA', 'tag.lstm': 'LSTM',
      'tag.anomaly': 'Anomaly Detection', 'tag.dash': 'Dash',

      'exp.title': 'Experience',
      'exp.subtitle': 'Showcasing the experiences, opportunities, and hands-on work that have shaped my skills and professional journey',
      'exp.empty': 'No experience in this category yet.',
      'expcat.internship': 'Internship',
      'expcat.freelance': 'Freelance',
      'expcat.research': 'Research',
      'expcat.volunteer': 'Volunteer',
      'expcat.teaching': 'Teaching',
      'expcat.competition': 'Competition',
      'expcat.community': 'Community',
      'exp1.title': 'Data Science Intern', 'exp1.company': 'Tech Innovation Hub',
      'exp1.desc': 'Worked on end-to-end ML pipelines — from data cleaning and feature engineering to model training and evaluation. Deployed a churn prediction model to production.',
      'exp1.duration': 'Jun 2024 – Sep 2024',
      'exp1.tag1': 'Python', 'exp1.tag2': 'Pandas', 'exp1.tag3': 'Scikit-learn', 'exp1.tag4': 'Deployment',
      'exp2.title': 'Freelance Data Analyst', 'exp2.company': 'Self-employed',
      'exp2.desc': 'Delivered data analysis and interactive dashboard projects for small businesses and NGOs. Focused on turning raw data into actionable business insights.',
      'exp2.duration': '2023 – Present',
      'exp2.tag1': 'SQL', 'exp2.tag2': 'Plotly', 'exp2.tag3': 'Dash', 'exp2.tag4': 'Reporting',
      'exp3.title': 'Undergraduate Research Assistant', 'exp3.company': 'University Data Lab',
      'exp3.desc': 'Assisted in research on NLP-based sentiment analysis for Amharic text. Built preprocessing pipelines and evaluated transformer models.',
      'exp3.duration': 'Jan 2024 – May 2024',
      'exp3.tag1': 'NLP', 'exp3.tag2': 'Transformers', 'exp3.tag3': 'Research',
      'exp4.title': 'Open Source Contributor', 'exp4.company': 'GitHub Community',
      'exp4.desc': 'Contributed to open-source data science projects — improved documentation, fixed bugs, and added new ML utilities to popular Python libraries.',
      'exp4.duration': '2023 – Present',
      'exp4.tag1': 'Open Source', 'exp4.tag2': 'Python', 'exp4.tag3': 'Git',
      'exp5.title': 'Python & ML Tutor', 'exp5.company': 'Student Learning Center',
      'exp5.desc': 'Taught Python fundamentals and introductory machine learning to 30+ students. Designed hands-on mini-projects and guided capstone work.',
      'exp5.duration': '2023 – 2024',
      'exp5.tag1': 'Teaching', 'exp5.tag2': 'Python', 'exp5.tag3': 'Mentoring',
      'exp6.title': 'Hackathon Participant', 'exp6.company': 'National Data Hackathon',
      'exp6.desc': 'Built a real-time analytics dashboard in 48 hours as part of a 4-person team. Won first place in the Data Track for impact and technical execution.',
      'exp6.duration': 'Mar 2024',
      'exp6.tag1': 'Hackathon', 'exp6.tag2': 'Plotly', 'exp6.tag3': 'Teamwork',
      'exp7.title': 'Data Club Lead', 'exp7.company': 'University Data Science Club',
      'exp7.desc': 'Led weekly workshops on Python, ML, and data visualization for 50+ student members. Organized guest talks and study groups.',
      'exp7.duration': '2023 – Present',
      'exp7.tag1': 'Leadership', 'exp7.tag2': 'Community', 'exp7.tag3': 'Workshops',

      'certs.title': 'Certificates',
      'certs.subtitle': "Explore my professional certificates, training achievements, and milestones that reflect my continuous learning, technical growth, and commitment to developing new skills.",
      'certs.empty': 'No certificates found in this category yet.',
      'certs.view': 'View',
      'certcat.oreilly': "O'Reilly", 'certcat.gebeya': 'Gebeya',
      'certcat.demera': 'Demera Project', 'certcat.club': 'Club',
      'certcat.udacity': 'Udacity', 'certcat.kenexio': 'Kenexio',
      'certcat.recognition': 'Recognition', 'certcat.other': 'Other',

      /* ==================== CERTIFICATES (EN) — 33 UNIQUE KEYS ==================== */
      'cert.udacity.progfund.title': 'Programming Fundamentals',
      'cert.udacity.progfund.desc': 'Foundational course covering programming logic, variables, control flow, functions, and problem-solving with hands-on exercises.',
      'cert.udacity.dataanalysis.title': 'Data Analysis',
      'cert.udacity.dataanalysis.desc': 'Focused on data wrangling, exploratory data analysis, and data visualization with Python.',
      'cert.gebeya.aiessentials.title': 'AI Essentials for Everyone',
      'cert.gebeya.aiessentials.desc': 'Beginner-friendly introduction to artificial intelligence concepts, real-world applications, and responsible AI use.',
      'cert.gebeya.cloudcomputing.title': 'Cloud Computing',
      'cert.gebeya.cloudcomputing.desc': 'Introduction to cloud computing concepts, AWS core services, and deploying data workloads.',
      'cert.gebeya.dsfundamentals.title': 'Data Science Fundamentals',
      'cert.gebeya.dsfundamentals.desc': 'Core concepts of data science: data types, statistical reasoning, and analytical thinking.',
      'cert.gebeya.entrepreneurship.title': 'Entrepreneurship',
      'cert.gebeya.entrepreneurship.desc': 'Building entrepreneurial mindset, business models, and startup fundamentals.',
      'cert.gebeya.langcomm.title': 'Language & Communication Skills',
      'cert.gebeya.langcomm.desc': 'Professional communication, workplace writing, and interpersonal skills for effective collaboration.',
      'cert.gebeya.powerbi.title': 'Power BI Fundamentals',
      'cert.gebeya.powerbi.desc': 'Building interactive reports and dashboards with Power BI, including data modeling and DAX basics.',
      'cert.gebeya.prodai.title': 'Product Creation with AI (Advanced)',
      'cert.gebeya.prodai.desc': 'Advanced techniques for designing and building AI-powered products, from ideation to deployment.',
      'cert.oreilly.aisecurity.title': 'AI Security & Ethics',
      'cert.oreilly.aisecurity.desc': 'Practical training on securing AI models against cyber threats and implementing ethical, unbiased AI systems.',
      'cert.oreilly.chatgpteng.title': 'ChatGPT Engineering',
      'cert.oreilly.chatgpteng.desc': 'Practical training on prompt engineering, fine-tuning LLMs, and integrating OpenAI APIs into application workflows.',
      'cert.oreilly.awscloud.title': 'Cloud Computing with AWS',
      'cert.oreilly.awscloud.desc': 'Comprehensive skill in architecting, deploying, and managing scalable cloud infrastructure using core Amazon Web Services.',
      'cert.oreilly.pyaz.title': 'Python A–Z: 15 Projects',
      'cert.oreilly.pyaz.desc': 'Project-based Python course covering automation, data handling, web scraping, and application building.',
      'cert.oreilly.dsmlaz.title': 'Data Science & ML A to Z',
      'cert.oreilly.dsmlaz.desc': 'End-to-end data science and machine learning workflow: cleaning, EDA, modeling, evaluation, and deployment.',
      'cert.oreilly.dmanalytics.title': 'Digital Marketing Analytics',
      'cert.oreilly.dmanalytics.desc': 'Measuring and optimizing digital campaigns using analytics tools, KPIs, and attribution models.',
      'cert.oreilly.mlpy.title': 'Machine Learning in Python for Everyone',
      'cert.oreilly.mlpy.desc': 'Practical ML with Python: regression, classification, clustering, and model evaluation using scikit-learn.',
      'cert.oreilly.mlproj.title': 'ML Projects: Beginner to Pro',
      'cert.oreilly.mlproj.desc': 'Portfolio-oriented machine learning projects spanning tabular data, NLP, and computer vision.',
      'cert.oreilly.mlgenai.title': 'ML, Data Science & GenAI',
      'cert.oreilly.mlgenai.desc': 'Modern ML workflows combined with generative AI concepts, prompt engineering, and LLM integration.',
      'cert.oreilly.pbimaster.title': 'Power BI Masterclass',
      'cert.oreilly.pbimaster.desc': 'Advanced Power BI: complex DAX, data modeling, performance tuning, and enterprise dashboard design.',
      'cert.demera.improvingml.title': 'Improving Machine Learning Models',
      'cert.demera.improvingml.desc': 'Practical techniques for improving ML models: hyperparameter tuning, regularization, ensembling, and evaluation.',
      'cert.demera.mlspecialist.title': 'Machine Learning Specialist',
      'cert.demera.mlspecialist.desc': 'Specialist track covering supervised/unsupervised learning, feature engineering, and model deployment.',
      'cert.demera.datavizbasics.title': 'Data Visualization Basics',
      'cert.demera.datavizbasics.desc': 'Principles of effective data visualization: chart selection, color, storytelling, and dashboard design.',
      'cert.demera.communityanalytics.title': 'Community Data Analytics',
      'cert.demera.communityanalytics.desc': 'Hands-on program analyzing community datasets and building dashboards for local NGOs.',
      'cert.demera.mlpipelines.title': 'Machine Learning Pipelines',
      'cert.demera.mlpipelines.desc': 'Designing reproducible ML pipelines: data ingestion, transformation, training, and serving.',
      'cert.demera.dataprivacy.title': 'Principles of Data Privacy',
      'cert.demera.dataprivacy.desc': 'Data protection fundamentals, privacy regulations, consent, anonymization, and ethical data handling.',
      'cert.kenexio.progfund.title': 'Programming Fundamentals (Kenexio)',
      'cert.kenexio.progfund.desc': 'Kenexio training on programming fundamentals: syntax, logic, control flow, and hands-on coding practice.',
      'cert.kenexio.powerbi.title': 'Power BI Essentials (Kenexio)',
      'cert.kenexio.powerbi.desc': 'Kenexio training on Power BI: building dashboards, data modeling, and DAX fundamentals.',
      'cert.club.dataclublead.title': 'Data Science Club Lead',
      'cert.club.dataclublead.desc': 'Led weekly workshops on Python, ML, and data visualization for 50+ student members.',
      'cert.club.artificialintel.title': 'Artificial Intelligence',
      'cert.club.artificialintel.desc': 'Club training on AI fundamentals, tools, and real-world applications.',
      'cert.recognition.deanslist.title': "Dean's List — Academic Excellence",
      'cert.recognition.deanslist.desc': 'Recognized for outstanding academic performance in the Data Science program.',
      'cert.recognition.capstone.title': 'Best Capstone Project Award',
      'cert.recognition.capstone.desc': 'Awarded for an outstanding capstone project on predictive maintenance using ML.',
      'cert.other.udara.title': 'Udara Certificate',
      'cert.other.udara.desc': 'Certificate of completion for the Udara training program.',
      'cert.other.cloudroles.title': 'Job Roles in the Cloud',
      'cert.other.cloudroles.desc': 'Overview of cloud computing job roles, responsibilities, and career paths.',

      'srv.title': 'Services',
      'srv.subtitle': 'Explore the services I have delivered across Data Science, Machine Learning, Artificial Intelligence, data analysis, visualization, and digital solutions designed to address real-world needs.',
      'srv.empty': 'No services in this category yet.',
      'srvcat.data-analysis': 'Data Analysis', 'srvcat.ml': 'Machine Learning',
      'srvcat.dataviz': 'Data Visualization', 'srvcat.consulting': 'Consulting',
      'srvcat.training': 'Training',
      'srv1.job': 'Data Analysis & Insights', 'srv1.company': 'For Business & Research',
      'srv1.desc': 'Clean, explore, and interpret complex datasets to extract actionable insights. Deliver clear reports with recommendations that drive business decisions.',
      'srv1.duration': 'Available now',
      'srv1.tag1': 'Python', 'srv1.tag2': 'SQL', 'srv1.tag3': 'Excel', 'srv1.tag4': 'Reporting',
      'srv2.job': 'Machine Learning Models', 'srv2.company': 'For Predictive Products',
      'srv2.desc': 'Design, train, and deploy supervised and unsupervised ML models for classification, regression, forecasting, and anomaly detection.',
      'srv2.duration': 'Available now',
      'srv2.tag1': 'Scikit-learn', 'srv2.tag2': 'TensorFlow', 'srv2.tag3': 'XGBoost',
      'srv3.job': 'Interactive Dashboards', 'srv3.company': 'For Real-time Monitoring',
      'srv3.desc': 'Build modern, interactive data visualizations with Plotly, Dash, and Tableau. Turn static spreadsheets into compelling, live dashboards.',
      'srv3.duration': 'Available now',
      'srv3.tag1': 'Plotly', 'srv3.tag2': 'Dash', 'srv3.tag3': 'Tableau',
      'srv4.job': 'Data Strategy Consulting', 'srv4.company': 'For Data-driven Teams',
      'srv4.desc': 'Advise on data collection, warehousing, and analytics workflows. Help teams design KPIs and analytics roadmaps that scale with business goals.',
      'srv4.duration': 'By appointment',
      'srv4.tag1': 'Strategy', 'srv4.tag2': 'KPIs', 'srv4.tag3': 'Roadmap',
      'srv5.job': 'Python & ML Training', 'srv5.company': 'For Individuals & Teams',
      'srv5.desc': "Hands-on workshops on Python, data science fundamentals, and applied machine learning. Tailored to your team's level and goals.",
      'srv5.duration': 'Flexible schedule',
      'srv5.tag1': 'Python', 'srv5.tag2': 'ML', 'srv5.tag3': 'Mentoring',

      'edu.title': 'Education',
      'edu.subtitle': 'My educational journey reflects a continuous commitment to learning, developing technical expertise, and preparing for real-world challenges',
      'edu.university.title': 'University', 'edu.university.sub': 'B.Sc. in Data Science',
      'edu.university.desc': "Currently pursuing a Bachelor's degree in Data Science with focus on machine learning, statistics, and data engineering.",
      'edu.university.meta': '2023 – Present',
      'edu.online.title': 'Online Specializations', 'edu.online.sub': 'Certifications & Courses',
      'edu.online.desc': "Completed multiple specializations on O'Reilly, Gebeya, Demera/Percipio, Amazon, Data Camp and Udacity to deepen practical ML and analytics skills.",
      'edu.online.meta': 'Ongoing',

      'cv.title': 'Curriculum Vitae',
      'cv.subtitle': 'A concise overview of my education, skills, projects and certifications.',
      'cv.heading': 'Melis Melakie — Curriculum Vitae',
      'cv.desc': 'A concise overview of my education, technical skills, projects, and certifications.',
      'cv.open': 'Open CV', 'cv.download': 'Download CV',

      'contact.title': 'Contact',
      'contact.subtitle': "Have a project in mind? Let's talk — I'm always open to new ideas and collaborations.",
      'contact.orEmail': ' Email me directly at',
      'contact.visitLabel': 'Visit Me',
      'contact.callLabel': 'Call Me',
      'contact.emailLabel': 'Email Me',
      'contact.locationValue': 'Debre Birhan, Ethiopia',
      'contact.phoneValue': '+251918498348',
      'contact.nameLabel': 'Full Name',
      'contact.emailFieldLabel': 'Email Address',
      'contact.subjectLabel': 'Subject',
      'contact.messageLabel': 'Message',
      'contact.namePlaceholder': 'John Doe',
      'contact.emailPlaceholder': 'john@example.com',
      'contact.subjectPlaceholder': 'Project Inquiry',
      'contact.messagePlaceholder': 'Tell me about your project...',
      'contact.send': 'Send Message',
      'contact.success': '✓ Message sent successfully! I will reply soon.',
      'contact.error': 'Please fill in all fields with a valid email.',
      'contact.sending': 'Sending message...',
      'contact.serverError': 'Something went wrong. Please email me directly.',

      'media.noImage': 'No image', 'media.noPreview': 'No preview',
      'footer.brand.name': 'Melis Melakie',
      'footer.tagline': 'Data Science Student · Building intelligent systems',
      'footer.copy': '© 2025 Melis Melakie · All rights are reserved. <i class="fas fa-heart"></i>'
    },

    am: {
      'brand': 'ፖርትፎሊዮ',
      'nav.home': 'መነሻ', 'nav.about': 'ስለ እኔ', 'nav.education': 'ትምህርት',
      'nav.skills': 'ክህሎቶች', 'nav.projects': 'ፕሮጀክቶች', 'nav.experience': 'ልምድ',
      'nav.certificates': 'ሰርተፊኬቶች', 'nav.services': 'አገልግሎቶች',
      'nav.cv': 'የሥራ ማስረጃ', 'nav.contact': 'አግኙኝ',

      'home.title': 'እንኳን ደህና መጡ',
      'home.greet': 'ሰላም፣ እኔ',
      'home.name': 'መልስ መላኪዬ ነኝ',
      'home.desc': 'እኔ መረጃን ወደ ትርጉም ያለው ግንዛቤ እና ተግባራዊ መፍትሄዎች የመቀየር ፍላጎት ያለው የዳታ ሳይንስ ተማሪ ነኝ። ከዳታ ጋር መሥራት፣ ቅጦችን ማሰስ፣ ዳታን መተንተን፣ የማሽን ለርኒን ሞዴሎችን መገንባት፣ በዳታ ላይ የተመሰረቱ አፕሊኬሽኖችን ማዘጋጀት እና የዕውነተኛ ዓለምን ችግሮች የሚፈቱ ፕሮጀክቶችን መሥራት ያስደስተኛል።',
      'home.viewProjects': 'ፕሮጀክቶችን ይመልከቱ',
      'home.getInTouch': 'ያግኙኝ',

      'about.title': 'ስለ እኔ',
      'about.academic': 'የትምህርት ዳራ',
      'about.academicDesc': 'በደብረ ብርሃን ዩኒቨርሲቲ (ኢትዮጵያ) የዳታ ሳይንስ የመጀመሪያ ዲግሪ በማጠናቀቅ ላይ ስሆን፣ ትኩረቴ በማሽን ለርኒን፣ በሰው ሰራሽ አስተውሎት፣ በጥልቅ ትምህርት፣ በዳታ ትንተና፣ በኮምፒውተር እይታ፣ በዳታ ምስላዊነት እና በስታቲስቲክስ ላይ ነው።',
      'about.career': 'የሙያ ፍላጎቶች',
      'about.careerDesc': 'በትምህርታዊ ፕሮጀክቶች፣ በመስመር ላይ ስልጠናዎች፣ በሰርተፊኬቶች፣ በተግባራዊ ሙከራዎች እና እውነተኛ ተጽዕኖ የሚፈጥሩ የዳታ ምርቶችን በመገንባት ቴክኒካዊ እና ሙያዊ ክህሎቶቼን በማሻሻል ላይ ነኝ።',
      'about.goals': 'ሙያዊ ግቦች',
      'about.goalsDesc': 'ከዳታ ስብሰባ እስከ ማሰማራት ድረስ ሙሉ በሙሉ የማሽን ለርኒን ስርዓቶችን የሚያቀርብ የዳታ ሳይንቲስት እና የሰው ሰራሽ አስተውሎት/ማሽን ለርኒን ባለሙያ በመሆን በቴክኖሎጂ የሚመሩ የዕውነተኛ ዓለም ችግሮችን መፍታት።',

      'skills.title': 'ክህሎቶች',
      'skills.subtitle': 'በዳታ ሳይንስ፣ በማሽን ለርኒን፣ በጥልቅ ትምህርት፣ በሰው ሰራሽ አስተውሎት፣ በዳታ ትንተና እና በዳታ ምስላዊነት ያሉኝ ዋና ዋና ክህሎቶች',
      'skills.empty': 'በዚህ ምድብ ውስጥ ምንም ክህሎት አልተገኘም።',
      'skills.selectCategory': 'ከላይ ካሉት ምድቦች አንዱን ይምረጡ።',

      'cat.programming': '🐍 ፕሮግራሚንግ',
      'cat.datasci': '📊 ዳታ ሳይንስ እና ትንታኔ',
      'cat.mlai': '🤖 ማሽን ለርኒን እና ሰው ሰራሽ አስተውሎት',
      'cat.tools': '🛠️ መሳሪያዎች እና መድረኮች',
      'cat.soft': '💼 ለስላሳ ክህሎቶች',
      'cat.other': '📦 ሌሎች ክህሎቶች',

      'lvl.advanced': 'የላቀ',
      'lvl.intermediate': 'መካከለኛ',
      'lvl.basic': 'መሠረታዊ',

      'skill.python': 'ፓይተን',
      'skill.r': 'አር (R)',
      'skill.sql': 'ኤስኪዩኤል (SQL)',
      'skill.java': 'ጃቫ',
      'skill.javascript': 'ጃቫስክሪፕት',
      'skill.htmlcss': 'HTML እና CSS',

      'skill.dataclean': 'የዳታ ማጽዳት እና ቅድመ ማዘጋጀት',
      'skill.eda': 'አሰሳ ዳታ ትንተና (EDA)',
      'skill.statistical': 'ስታቲስቲካዊ ትንተና',
      'skill.dataviz': 'ዳታ ምስላዊነት',
      'skill.excel': 'ኤክሴል',
      'skill.powerbi': 'ፓወር BI (Power BI)',
      'skill.pandas': 'ፓንዳስ',
      'skill.numpy': 'ኒውምፓይ',
      'skill.matplotlib': 'ማትፕሎትሊብ',
      'skill.matlab': 'MATLAB',
      'skill.spss': 'SPSS',

      'skill.ml': 'ማሽን ለርኒን',
      'skill.dl': 'ጥልቅ ትምህርት (Deep Learning)',
      'skill.nlp': 'የተፈጥሮ ቋንቋ ማቀነባበር (NLP)',
      'skill.cv': 'የኮምፒውተር እይታ (Computer Vision)',
      'skill.predictive': 'ትንበያ ሞዴሊንግ',
      'skill.modeleval': 'የሞዴል ግምገማ',
      'skill.featureeng': 'የባህሪ ምህንድስና (Feature Engineering)',
      'skill.tensorflow': 'ቴንሰርፍሎው',
      'skill.pytorch': 'ፓይተርች (PyTorch)',
      'skill.sklearn': 'ሳይኪት ለርን (Scikit-learn)',
      'skill.dashboard': 'ዳሽቦርድ ልማት',

      'skill.jupyter': 'ጁፒተር ኖትቡክ',
      'skill.colab': 'ጉግል ኮላብ (Colab)',
      'skill.kaggle': 'ካግል (Kaggle)',
      'skill.vscode': 'VS Code',
      'skill.git': 'ጊት (Git)',
      'skill.github': 'ጊትሃብ (GitHub)',
      'skill.gradio': 'ግራዲዮ (Gradio)',
      'skill.streamlit': 'ስትሪምሊት (Streamlit)',

      'skill.problem': 'ችግር መፍታት',
      'skill.critical': 'ተቺ አስተሳሰብ',
      'skill.teamwork': 'የቡድን ሥራ እና ትብብር',
      'skill.communication': 'ግንኙነት',
      'skill.presentation': 'አቀራረብ',
      'skill.projectmgmt': 'የፕሮጀክት አስተዳደር',
      'skill.time': 'የጊዜ አስተዳደር',
      'skill.learning': 'ቀጣይ ትምህርት',

      'skill.cloud': 'የክላውድ መድረኮች',
      'skill.databases': 'ዳታቤዞች',
      'skill.qc': 'የጥራት ቁጥጥር',

      'projects.title': 'ፕሮጀክቶች',
      'projects.subtitle': 'የትምህርት እና ተግባራዊ ፕሮጀክቶቼን ይመልከቱ፤ በዳታ ሳይንስ፣ በማሽን ለርኒን፣ በጥልቅ ትምህርት፣ በሰው ሰራሽ አስተውሎት እና በዳታ ትንተና የዕውነተኛ ዓለምን ችግሮች የምፈታባቸው።',
      'projects.github': 'ጊትሃብ',
      'projects.liveDemo': 'ቀጥታ ማሳያ',
      'projects.viewDetails': 'ዝርዝር ይመልከቱ',
      'projects.viewMore': 'ተጨማሪ ይመልከቱ',
      'projects.viewLess': 'ያነሰ ያሳዩ',

      'proj.sentiment.title': 'አዎንታዊ እና አሉታዊ ስሜት ምደባ',
      'proj.sentiment.desc': 'የጽሑፍ ዓረፍተ ነገሮችን በተገለጸው ስሜት መሰረት እንደ አዎንታዊ ወይም አሉታዊ ለመመደብ የተነደፈ የተፈጥሮ ቋንቋ ማቀነባበር (NLP) ፕሮጀክት።',

      'proj.translation.title': 'አምስት የኢትዮጵያ ቋንቋዎች ↔ እንግሊዝኛ በሁለት አቅጣጫ ትርጉም',
      'proj.translation.desc': 'በእንግሊዝኛ እና በአምስት የኢትዮጵያ ቋንቋዎች መካከል በሁለት አቅጣጫ ትርጉም ለማድረግ የተነደፈ የብዙ ቋንቋ ማሽን ትርጉም ፕሮጀክት።',

      'proj.water.title': 'ለ14 የኢትዮጵያ የውሃ ኃይል ማመንጫዎች የውሃ መጠን ትንበያ',
      'proj.water.desc': 'ታሪካዊ የውሃ መጠን እና ተዛማጅ የጊዜ ተከታታይ ዳታን በመጠቀም ለ14 የኢትዮጵያ የውሃ ኃይል ማመንጫዎች የውሃ መጠንን ለመተንበይ የተነደፈ በማሽን ለርኒን ላይ የተመሰረተ የትንበያ ፕሮጀክት።',

      'proj.aiimage.title': 'ትክክለኛ እና በAI የተፈጠሩ የሰው ምስሎችን መለየት',
      'proj.aiimage.desc': 'የሰው ምስሎችን እንደ ትክክለኛ ወይም በAI የተፈጠሩ ለመመደብ የተነደፈ በጥልቅ ትምህርት ላይ የተመሰረተ የኮምፒውተር እይታ ፕሮጀክት።',

      'proj.diabetes.title': 'በማሽን ለርኒን የስኳር በሽታ ትንበያ',
      'proj.diabetes.desc': 'ከስኳር በሽታ ዳታሴት በተመረጡ የጤና እና የስነ-ህዝብ ባህሪያት ላይ ተመስርቶ የስኳር በሽታ የመያዝ እድልን ለመተንበይ የተነደፈ የማሽን ለርኒን ፕሮጀክት።',

      'proj.weather.title': 'የአየር ሁኔታ ትንተና እና ትንበያ',
      'proj.weather.desc': 'ታሪካዊ የአየር ሁኔታ ዳታን በመጠቀም የአየር ሁኔታን በመተንተን እና ከአየር ሁኔታ ጋር የተያያዙ ውጤቶችን ለመተንበይ ያተኮረ የዳታ ሳይንስ እና የማሽን ለርኒን ፕሮጀክት።',

      'proj.youth.title': 'የDIY የወጣቶች ማዕከል የመገኘት ትንተና እና ሪፖርት ማድረጊያ ዳሽቦርድ',
      'proj.youth.desc': 'የመገኘት መዝገቦችን ወደ ትርጉም ያላቸው ስታቲስቲክሶች፣ ምስላዊነቶች እና ሪፖርቶች ለመቀየር ለDIY የወጣቶች ማዕከል የተሰራ በይነተገናኝ የመገኘት ትንተና እና ሪፖርት ማድረጊያ ዳሽቦርድ።',

      'tag.python': 'ፓይተን', 'tag.sklearn': 'ሳይኪት ለርን', 'tag.pandas': 'ፓንዳስ',
      'tag.tensorflow': 'ቴንሰርፍሎው', 'tag.keras': 'ኬራስ', 'tag.cnn': 'ሲኤንኤን (CNN)',
      'tag.plotly': 'ፕሎትሊ', 'tag.dataviz': 'ዳታ ምስላዊነት',
      'tag.surprise': 'ሰርፕራይዝ', 'tag.ml': 'ML',
      'tag.nlp': 'NLP', 'tag.bert': 'BERT', 'tag.nltk': 'NLTK',
      'tag.sql': 'SQL', 'tag.postgresql': 'PostgreSQL', 'tag.analytics': 'ትንታኔ',
      'tag.timeseries': 'የጊዜ ተከታታይ', 'tag.arima': 'ARIMA', 'tag.lstm': 'LSTM',
      'tag.anomaly': 'ማንጋት ማወቂያ', 'tag.dash': 'ዳሽ (Dash)',

      'exp.title': 'ልምድ',
      'exp.subtitle': 'ክህሎቴን እና ሙያዊ ጉዞዬን የቀረጹትን ልምዶች፣ ዕድሎች እና ተግባራዊ ሥራዎች ያሳያል',
      'exp.empty': 'በዚህ ምድብ ውስጥ እስካሁን ምንም ልምድ አልተገኘም።',
      'expcat.internship': 'የልምምድ',
      'expcat.freelance': 'ነጻ ሥራ',
      'expcat.research': 'ምርምር',
      'expcat.volunteer': 'በጎ ፈቃድ',
      'expcat.teaching': 'ማስተማር',
      'expcat.competition': 'ውድድር',
      'expcat.community': 'የማህበረሰብ አገልግሎት',

      'exp1.title': 'የዳታ ሳይንስ ተለማማጅ',
      'exp1.company': 'የቴክ ኢኖቬሽን ማዕከል',
      'exp1.desc': 'ከዳታ ማጽዳት እና ከባህሪ ምህንድስና ጀምሮ እስከ ሞዴል ስልጠና እና ግምገማ ድረስ በሙሉ የማሽን ለርኒን ቧንቧዎች ላይ ሰርቻለሁ። የደንበኛ መቀየር ትንበያ ሞዴልን ወደ ምርት አሰማርቻለሁ።',
      'exp1.duration': 'ሰኔ 2024 – መስከረም 2024',
      'exp1.tag1': 'ፓይተን', 'exp1.tag2': 'ፓንዳስ', 'exp1.tag3': 'ሳይኪት ለርን', 'exp1.tag4': 'ማሰማራት',

      'exp2.title': 'ነጻ የዳታ ተንታኝ',
      'exp2.company': 'ራስን በራስ መቅጠር',
      'exp2.desc': 'ለአነስተኛ ንግዶች እና መንግስታዊ ያልሆኑ ድርጅቶች የዳታ ትንተና እና በይነተገናኝ ዳሽቦርድ ፕሮጀክቶችን አቅርቤያለሁ። ጥሬ ዳታን ወደ ተግባራዊ የንግድ ግንዛቤዎች በመቀየር ላይ ትኩረት አድርጌያለሁ።',
      'exp2.duration': '2023 – አሁን',
      'exp2.tag1': 'SQL', 'exp2.tag2': 'ፕሎትሊ', 'exp2.tag3': 'ዳሽ', 'exp2.tag4': 'ሪፖርት',

      'exp3.title': 'የመጀመሪያ ዲግሪ የምርምር ረዳት',
      'exp3.company': 'የዩኒቨርሲቲ ዳታ ላብ',
      'exp3.desc': 'በአማርኛ ጽሑፍ ላይ በተፈጥሮ ቋንቋ ማቀነባበር (NLP) ላይ የተመሰረተ የስሜት ትንተና ምርምር ላይ ረድቻለሁ። የቅድመ ማዘጋጀት ቧንቧዎችን ገንብቼ የትራንስፎርመር ሞዴሎችን ገምግሜያለሁ።',
      'exp3.duration': 'ጃንዋሪ 2024 – ሜይ 2024',
      'exp3.tag1': 'NLP', 'exp3.tag2': 'ትራንስፎርመሮች', 'exp3.tag3': 'ምርምር',

      'exp4.title': 'የክፍት ምንጭ አስተዋጽኦ አድራጊ',
      'exp4.company': 'የGitHub ማህበረሰብ',
      'exp4.desc': 'ለክፍት ምንጭ የዳታ ሳይንስ ፕሮጀክቶች አስተዋጽኦ አድርጌያለሁ — ሰነዶችን አሻሽያለሁ፣ ሳንካዎችን ጠግኜያለሁ እና ለታዋቂ የPython ላይብረሪዎች አዲስ የML መገልገያዎችን ጨምሬያለሁ።',
      'exp4.duration': '2023 – አሁን',
      'exp4.tag1': 'ክፍት ምንጭ', 'exp4.tag2': 'ፓይተን', 'exp4.tag3': 'ጊት',

      'exp5.title': 'የPython እና ML አስተማሪ',
      'exp5.company': 'የተማሪ መማሪያ ማዕከል',
      'exp5.desc': 'ለ30+ ተማሪዎች የPython መሠረታዊ ነገሮችን እና የመግቢያ ማሽን ለርኒንን አስተምሬያለሁ። ተግባራዊ ጥቃቅን ፕሮጀክቶችን ነድፌ ካፕስቶን ሥራዎችን መርቻለሁ።',
      'exp5.duration': '2023 – 2024',
      'exp5.tag1': 'ማስተማር', 'exp5.tag2': 'ፓይተን', 'exp5.tag3': 'ማማከር',

      'exp6.title': 'የሃካቶን ተሳታፊ',
      'exp6.company': 'የብሔራዊ ዳታ ሃካቶን',
      'exp6.desc': 'በ4 ሰዎች ቡድን ውስጥ በመሆን በ48 ሰዓት ውስጥ የእውነተኛ ጊዜ ትንታኔ ዳሽቦርድ ገንብቻለሁ። በዳታ ትራክ ለተጽዕኖ እና ለቴክኒካዊ አፈጻጸም አንደኛ ደረጃ አግኝቻለሁ።',
      'exp6.duration': 'መጋቢት 2024',
      'exp6.tag1': 'ሃካቶን', 'exp6.tag2': 'ፕሎትሊ', 'exp6.tag3': 'የቡድን ሥራ',

      'exp7.title': 'የዳታ ክለብ መሪ',
      'exp7.company': 'የዩኒቨርሲቲ ዳታ ሳይንስ ክለብ',
      'exp7.desc': 'ለ50+ ተማሪ አባላት በPython፣ በML እና በዳታ ምስላዊነት ላይ ሳምንታዊ ወርክሾፖችን መርቻለሁ። የእንግዳ ንግግሮችን እና የጥናት ቡድኖችን አዘጋጅቻለሁ።',
      'exp7.duration': '2023 – አሁን',
      'exp7.tag1': 'መሪነት', 'exp7.tag2': 'ማህበረሰብ', 'exp7.tag3': 'ወርክሾፖች',

      'certs.title': 'ሰርተፊኬቶች',
      'certs.subtitle': 'ቀጣይ ትምህርቴን፣ ቴክኒካዊ እድገቴን እና አዲስ ክህሎቶችን ለማዳበር ያለኝን ቁርጠኝነት የሚያንጸባርቁ ሙያዊ ሰርተፊኬቶቼን፣ የስልጠና ስኬቶቼን እና ምዕራፎቼን ይመልከቱ።',
      'certs.empty': 'በዚህ ምድብ ውስጥ እስካሁን ምንም ሰርተፊኬት አልተገኘም።',
      'certs.view': 'ይመልከቱ',

      'certcat.oreilly': 'ኦራይሊ (O\'Reilly)',
      'certcat.gebeya': 'ገበያ',
      'certcat.demera': 'ደመራ ፕሮጀክት',
      'certcat.club': 'ክለብ',
      'certcat.udacity': 'ዩዳሲቲ (Udacity)',
      'certcat.kenexio': 'ኬኔክሲዮ (Kenexio)',
      'certcat.recognition': 'እውቅና',
      'certcat.other': 'ሌላ',

      /* ==================== CERTIFICATES (AM) — 33 UNIQUE KEYS ==================== */
      'cert.udacity.progfund.title': 'የፕሮግራሚንግ መሠረታዊ ነገሮች',
      'cert.udacity.progfund.desc': 'የፕሮግራሚንግ አመክንዮ፣ ተለዋዋጮች፣ የቁጥጥር ፍሰት፣ ተግባራት እና ችግር መፍታትን የሚሸፍን መሠረታዊ ኮርስ ከተግባራዊ ልምምዶች ጋር።',
      'cert.udacity.dataanalysis.title': 'የዳታ ትንተና',
      'cert.udacity.dataanalysis.desc': 'በዳታ ማጽዳት፣ በአሰሳ ዳታ ትንተና እና በPython ዳታ ምስላዊነት ላይ ያተኮረ።',
      'cert.gebeya.aiessentials.title': 'ለሁሉም ሰው የAI መሠረታዊ ነገሮች',
      'cert.gebeya.aiessentials.desc': 'የሰው ሰራሽ አስተውሎት ፅንሰ-ሀሳቦች፣ የዕውነተኛ ዓለም አፕሊኬሽኖች እና ኃላፊነት የሚሰማው የAI አጠቃቀም መግቢያ።',
      'cert.gebeya.cloudcomputing.title': 'የክላውድ ኮምፒውቲንግ',
      'cert.gebeya.cloudcomputing.desc': 'የክላውድ ኮምፒውቲንግ ፅንሰ-ሀሳቦች፣ የAWS ዋና አገልግሎቶች እና የዳታ ሥራዎችን ማሰማራት መግቢያ።',
      'cert.gebeya.dsfundamentals.title': 'የዳታ ሳይንስ መሠረታዊ ነገሮች',
      'cert.gebeya.dsfundamentals.desc': 'የዳታ ሳይንስ ዋና ፅንሰ-ሀሳቦች፡ የዳታ ዓይነቶች፣ ስታቲስቲካዊ አስተሳሰብ እና የትንታኔ አስተሳሰብ።',
      'cert.gebeya.entrepreneurship.title': 'ሥራ ፈጣሪነት',
      'cert.gebeya.entrepreneurship.desc': 'የሥራ ፈጣሪ አስተሳሰብ፣ የንግድ ሞዴሎች እና የጀማሪ ንግድ መሠረታዊ ነገሮች።',
      'cert.gebeya.langcomm.title': 'የቋንቋ እና የግንኙነት ክህሎቶች',
      'cert.gebeya.langcomm.desc': 'ሙያዊ ግንኙነት፣ የሥራ ቦታ ጽሑፍ እና ለትብብር የሚያገለግሉ የግለሰቦች መስተጋብር ክህሎቶች።',
      'cert.gebeya.powerbi.title': 'የPower BI መሠረታዊ ነገሮች',
      'cert.gebeya.powerbi.desc': 'በPower BI በይነተገናኝ ሪፖርቶችን እና ዳሽቦርዶችን መገንባት፣ የዳታ ሞዴሊንግ እና የDAX መሠረታዊ ነገሮችን ጨምሮ።',
      'cert.gebeya.prodai.title': 'በAI ምርት መፍጠር (የላቀ)',
      'cert.gebeya.prodai.desc': 'ከሃሳብ እስከ ማሰማራት ድረስ በAI የተጎለበቱ ምርቶችን ለመንደፍ እና ለመገንባት የላቀ ቴክኒኮች።',
      'cert.oreilly.aisecurity.title': 'የኤአይ ደህንነት እና ሥነ-ምግባር',
      'cert.oreilly.aisecurity.desc': 'የኤአይ (AI) ሞዴሎችን ከሳይበር ጥቃት የመጠበቅ እና ከአድልዎ ነፃ የሆኑ ሥነ-ምግባራዊ ስርዓቶችን የመገንባት ተግባራዊ ልምድ።',
      'cert.oreilly.chatgpteng.title': 'ቻት ጂፒቲ ኢንጂነሪንግ',
      'cert.oreilly.chatgpteng.desc': 'በፕሮምፕት ኢንጂነሪንግ፣ ኤልኤልኤም (LLM) ሞዴሎችን በማሻሻል እና የኦፕንኤአይ (OpenAI) ኤፒአይዎችን በስርዓቶች ውስጥ በማስተናገድ ላይ ያተኮረ ተግባራዊ ልምድ።',
      'cert.oreilly.awscloud.title': 'ከAWS ጋር የክላውድ ኮምፒውቲንግ',
      'cert.oreilly.awscloud.desc': 'ዋና የአማዞን ዌብ ሰርቪሶችን በመጠቀም ሊሰፋ የሚችል የክላውድ መሠረተ ልማት የመንደፍ፣ የማሰማራት እና የማስተዳደር አጠቃላይ ክህሎት።',
      'cert.oreilly.pyaz.title': 'Python A–Z፡ 15 ፕሮጀክቶች',
      'cert.oreilly.pyaz.desc': 'አውቶሜሽን፣ የዳታ አያያዝ፣ የድር መመርመር እና አፕሊኬሽን መገንባትን የሚሸፍን በፕሮጀክት ላይ የተመሠረተ የPython ኮርስ።',
      'cert.oreilly.dsmlaz.title': 'ዳታ ሳይንስ እና ML ከA እስከ Z',
      'cert.oreilly.dsmlaz.desc': 'ከመጽዳት፣ ከEDA፣ ከሞዴሊንግ፣ ከግምገማ እና ከማሰማራት ድረስ ሙሉ የዳታ ሳይንስ እና የማሽን ለርኒን የሥራ ፍሰት።',
      'cert.oreilly.dmanalytics.title': 'የዲጂታል ግብይት ትንተና',
      'cert.oreilly.dmanalytics.desc': 'የትንታኔ መሣሪያዎችን፣ KPIs እና የምስክር ሞዴሎችን በመጠቀም ዲጂታል ዘመቻዎችን መለካት እና ማሻሻል።',
      'cert.oreilly.mlpy.title': 'ለሁሉም ሰው በPython የማሽን ለርኒን',
      'cert.oreilly.mlpy.desc': 'በPython ተግባራዊ ML፡ ሬግሬሽን፣ ምደባ፣ ክላስተሪንግ እና የሞዴል ግምገማ በscikit-learn።',
      'cert.oreilly.mlproj.title': 'የML ፕሮጀክቶች፡ ከጀማሪ እስከ ባለሙያ',
      'cert.oreilly.mlproj.desc': 'በሠንጠረዥ ዳታ፣ በNLP እና በኮምፒውተር እይታ የሚሸፍኑ ለፖርትፎሊዮ የሚያገለግሉ የማሽን ለርኒን ፕሮጀክቶች።',
      'cert.oreilly.mlgenai.title': 'ML፣ ዳታ ሳይንስ እና GenAI',
      'cert.oreilly.mlgenai.desc': 'ዘመናዊ የML የሥራ ፍሰቶች ከጄኔሬቲቭ AI ፅንሰ-ሀሳቦች፣ ከፕሮምፕት ኢንጂነሪንግ እና ከLLM ውህደት ጋር።',
      'cert.oreilly.pbimaster.title': 'የPower BI ማስተርክላስ',
      'cert.oreilly.pbimaster.desc': 'የላቀ Power BI፡ ውስብስብ DAX፣ የዳታ ሞዴሊንግ፣ የአፈጻጸም ማስተካከያ እና የድርጅት ዳሽቦርድ ንድፍ።',
      'cert.demera.improvingml.title': 'የማሽን ለርኒን ሞዴሎችን ማሻሻል',
      'cert.demera.improvingml.desc': 'የML ሞዴሎችን ለማሻሻል ተግባራዊ ቴክኒኮች፡ ሃይፐርፓራሜትር ማስተካከል፣ መደበኛነት፣ ማጣመር እና ግምገማ።',
      'cert.demera.mlspecialist.title': 'የማሽን ለርኒን ስፔሻሊስት',
      'cert.demera.mlspecialist.desc': 'በቁጥጥር የሚደረግ/ቁጥጥር የማይደረግ ትምህርት፣ የባህሪ ምህንድስና እና የሞዴል ማሰማራትን የሚሸፍን የስፔሻሊስት ትራክ።',
      'cert.demera.datavizbasics.title': 'የዳታ ምስላዊነት መሠረታዊ ነገሮች',
      'cert.demera.datavizbasics.desc': 'ውጤታማ የዳታ ምስላዊነት መርሆች፡ የገበታ ምርጫ፣ ቀለም፣ ታሪክ ተራ እና ዳሽቦርድ ንድፍ።',
      'cert.demera.communityanalytics.title': 'የማህበረሰብ ዳታ ትንተና',
      'cert.demera.communityanalytics.desc': 'የማህበረሰብ ዳታሴቶችን መተንተን እና ለአካባቢያዊ መንግስታዊ ያልሆኑ ድርጅቶች ዳሽቦርዶችን የመገንባት ተግባራዊ ፕሮግራም።',
      'cert.demera.mlpipelines.title': 'የማሽን ለርኒን ቧንቧዎች',
      'cert.demera.mlpipelines.desc': 'ሊደገሙ የሚችሉ የML ቧንቧዎችን መንደፍ፡ የዳታ ማስገቢያ፣ ለውጥ፣ ስልጠና እና አገልግሎት።',
      'cert.demera.dataprivacy.title': 'የዳታ ግላዊነት መርሆች',
      'cert.demera.dataprivacy.desc': 'የዳታ ጥበቃ መሠረታዊ ነገሮች፣ የግላዊነት ደንቦች፣ ፈቃድ፣ ማንነት መደበቅ እና ሥነ-ምግባራዊ የዳታ አያያዝ።',
      'cert.kenexio.progfund.title': 'የፕሮግራሚንግ መሠረታዊ ነገሮች (Kenexio)',
      'cert.kenexio.progfund.desc': 'የKenexio ስልጠና በፕሮግራሚንግ መሠረታዊ ነገሮች፡ አገባብ፣ አመክንዮ፣ የቁጥጥር ፍሰት እና ተግባራዊ የኮዲንግ ልምምድ።',
      'cert.kenexio.powerbi.title': 'የPower BI መሠረታዊ ነገሮች (Kenexio)',
      'cert.kenexio.powerbi.desc': 'የKenexio ስልጠና በPower BI፡ ዳሽቦርዶችን መገንባት፣ የዳታ ሞዴሊንግ እና የDAX መሠረታዊ ነገሮች።',
      'cert.club.dataclublead.title': 'የዳታ ሳይንስ ክለብ መሪ',
      'cert.club.dataclublead.desc': 'ለ50+ ተማሪ አባላት በPython፣ ML እና ዳታ ምስላዊነት ላይ ሳምንታዊ ወርክሾፖችን መርቷል።',
      'cert.club.artificialintel.title': 'ሰው ሰራሽ አስተውሎት',
      'cert.club.artificialintel.desc': 'በAI መሠረታዊ ነገሮች፣ መሣሪያዎች እና የዕውነተኛ ዓለም አፕሊኬሽኖች ላይ የክለብ ስልጠና።',
      'cert.recognition.deanslist.title': 'የዲን ዝርዝር — የትምህርት ልዕልና',
      'cert.recognition.deanslist.desc': 'በዳታ ሳይንስ ፕሮግራም ውስጥ ለላቀ የትምህርት አፈጻጸም እውቅና ተሰጥቷል።',
      'cert.recognition.capstone.title': 'ምርጥ ካፕስቶን ፕሮጀክት ሽልማት',
      'cert.recognition.capstone.desc': 'ML በመጠቀም ትንበያ ጥገና ላይ ለላቀ ካፕስቶን ፕሮጀክት ተሸልሟል።',
      'cert.other.udara.title': 'የUdara ሰርተፊኬት',
      'cert.other.udara.desc': 'ለUdara የስልጠና ፕሮግራም የማጠናቀቂያ ሰርተፊኬት።',
      'cert.other.cloudroles.title': 'በክላውድ ውስጥ የሥራ ሚናዎች',
      'cert.other.cloudroles.desc': 'የክላውድ ኮምፒውቲንግ የሥራ ሚናዎች፣ ኃላፊነቶች እና የሙያ መንገዶች አጠቃላይ እይታ።',

      'srv.title': 'አገልግሎቶች',
      'srv.subtitle': 'በዳታ ሳይንስ፣ በማሽን ለርኒን፣ በሰው ሰራሽ አስተውሎት፣ በዳታ ትንተና፣ በዳታ ምስላዊነት እና በዲጂታል መፍትሄዎች ላይ የማቀርባቸውን አገልግሎቶች ይመልከቱ።',
      'srv.empty': 'በዚህ ምድብ ውስጥ እስካሁን ምንም አገልግሎት አልተገኘም።',
      'srvcat.data-analysis': 'ዳታ ትንተና',
      'srvcat.ml': 'ማሽን ለርኒን',
      'srvcat.dataviz': 'ዳታ ምስላዊነት',
      'srvcat.consulting': 'ምክር',
      'srvcat.training': 'ስልጠና',

      'srv1.job': 'የዳታ ትንተና እና ግንዛቤዎች',
      'srv1.company': 'ለንግድ እና ምርምር',
      'srv1.desc': 'ውስብስብ ዳታሴቶችን በማጽዳት፣ በማሰስ እና በመተርጎም ተግባራዊ ግንዛቤዎችን ማውጣት። የንግድ ውሳኔዎችን የሚያራምዱ ግልጽ ሪፖርቶችን ከምክረ-ሀሳቦች ጋር ማቅረብ።',
      'srv1.duration': 'አሁን ይገኛል',
      'srv1.tag1': 'ፓይተን', 'srv1.tag2': 'SQL', 'srv1.tag3': 'ኤክሴል', 'srv1.tag4': 'ሪፖርት ማድረግ',

      'srv2.job': 'የማሽን ለርኒን ሞዴሎች',
      'srv2.company': 'ለትንበያ ምርቶች',
      'srv2.desc': 'ለምደባ፣ ለሪግሬሽን፣ ለትንበያ እና ለማንጋት ማወቂያ የቁጥጥር ስር እና ያልሆኑ የML ሞዴሎችን መንደፍ፣ ማሰልጠን እና ማሰማራት።',
      'srv2.duration': 'አሁን ይገኛል',
      'srv2.tag1': 'ሳይኪት ለርን', 'srv2.tag2': 'ቴንሰርፍሎው', 'srv2.tag3': 'XGBoost',

      'srv3.job': 'በይነተገናኝ ዳሽቦርዶች',
      'srv3.company': 'ለእውነተኛ ጊዜ ክትትል',
      'srv3.desc': 'በPlotly፣ Dash እና Tableau ዘመናዊ እና በይነተገናኝ የዳታ ምስላዊነቶችን መገንባት። ቋሚ ሰንጠረዦችን ወደ ሕያው ዳሽቦርዶች መቀየር።',
      'srv3.duration': 'አሁን ይገኛል',
      'srv3.tag1': 'ፕሎትሊ', 'srv3.tag2': 'ዳሽ', 'srv3.tag3': 'ታብሎ',

      'srv4.job': 'የዳታ ስትራቴጂ ምክር',
      'srv4.company': 'ለዳታ ተኮር ቡድኖች',
      'srv4.desc': 'በዳታ ስብሰባ፣ በዳታ ማከማቻ እና በትንታኔ የሥራ ፍሰቶች ላይ ምክር መስጠት። ከንግድ ግቦች ጋር የሚያድጉ የKPI እና የትንታኔ ፍኖተ ካርታዎችን ለመንደፍ ቡድኖችን መርዳት።',
      'srv4.duration': 'በቀጠሮ',
      'srv4.tag1': 'ስትራቴጂ', 'srv4.tag2': 'KPIs', 'srv4.tag3': 'ፍኖተ ካርታ',

      'srv5.job': 'የPython እና ML ስልጠና',
      'srv5.company': 'ለግለሰቦች እና ቡድኖች',
      'srv5.desc': 'በPython፣ በዳታ ሳይንስ መሠረታዊ ነገሮች እና በተግባራዊ ማሽን ለርኒን ላይ ተግባራዊ ወርክሾፖች። ለቡድንዎ ደረጃ እና ግቦች የተበጁ።',
      'srv5.duration': 'ተለዋዋጭ መርሐግብር',
      'srv5.tag1': 'ፓይተን', 'srv5.tag2': 'ML', 'srv5.tag3': 'ማማከር',

      'edu.title': 'ትምህርት',
      'edu.subtitle': 'የትምህርቴ ጉዞ ቀጣይ የመማር ቁርጠኝነትን፣ ቴክኒካዊ እውቀትን ማዳበርን እና ለዕውነተኛ ዓለም ተግዳሮቶች መዘጋጀትን ያንጸባርቃል',
      'edu.university.title': 'ዩኒቨርሲቲ',
      'edu.university.sub': 'የB.Sc. በዳታ ሳይንስ',
      'edu.university.desc': 'በአሁኑ ጊዜ በዳታ ሳይንስ የመጀመሪያ ዲግሪ በማሽን ለርኒን፣ በስታቲስቲክስ እና በዳታ ኢንጂኒየሪንግ ላይ ትኩረት በማድረግ እያጠና ነው።',
      'edu.university.meta': '2023 – አሁን',
      'edu.online.title': 'የመስመር ላይ ስፔሻላይዜሽኖች',
      'edu.online.sub': 'ሰርተፊኬቶች እና ኮርሶች',
      'edu.online.desc': 'ተግባራዊ የML እና የትንታኔ ክህሎቶችን ለማጠናከር በO\'Reilly፣ Gebeya፣ Demera/Percipio፣ Amazon፣ DataCamp እና Udacity ላይ በርካታ ስፔሻላይዜሽኖችን አጠናቋል።',
      'edu.online.meta': 'ቀጣይ',

      'cv.title': 'የሥራ ማስረጃ',
      'cv.subtitle': 'ስለ ትምህርቴ፣ ክህሎቶቼ፣ ፕሮጀክቶቼ እና ሰርተፊኬቶቼ አጭር መግለጫ።',
      'cv.heading': 'መልስ መላኪዬ — የሥራ ማስረጃ',
      'cv.desc': 'ስለ ትምህርቴ፣ ቴክኒካዊ ክህሎቶቼ፣ ፕሮጀክቶቼ እና ሰርተፊኬቶቼ አጭር መግለጫ።',
      'cv.open': 'ሲቪ ክፈት',
      'cv.download': 'ሲቪ አውርድ',

      'contact.title': 'አግኙኝ',
      'contact.subtitle': 'ፕሮጀክት አለዎት? እንነጋገር — ለአዳዲስ ሀሳቦች እና ትብብሮች ሁልጊዜ ክፍት ነኝ።',
      'contact.orEmail': 'ወይም በቀጥታ ኢሜል ይላኩልኝ በ',
      'contact.visitLabel': 'ይጎብኙኝ',
      'contact.callLabel': 'ይደውሉልኝ',
      'contact.emailLabel': 'ኢሜል ይላኩልኝ',
      'contact.locationValue': 'ደብረ ብርሃን፣ ኢትዮጵያ',
      'contact.phoneValue': '+251918498348',
      'contact.nameLabel': 'ሙሉ ስም',
      'contact.emailFieldLabel': 'የኢሜል አድራሻ',
      'contact.subjectLabel': 'ርዕስ',
      'contact.messageLabel': 'መልእክት',
      'contact.namePlaceholder': 'ጆን ዶ',
      'contact.emailPlaceholder': 'john@example.com',
      'contact.subjectPlaceholder': 'የፕሮጀክት ጥያቄ',
      'contact.messagePlaceholder': 'ስለ ፕሮጀክትዎ ይንገሩኝ...',
      'contact.send': 'መልእክት ላክ',
      'contact.success': '✓ መልእክትዎ በተሳካ ሁኔታ ተልኳል! በቅርቡ ምላሽ እሰጣለሁ።',
      'contact.error': 'እባክዎ ሁሉንም መስኮች በትክክለኛ ኢሜል ይሙሉ።',
      'contact.sending': 'መልእክት በመላክ ላይ...',
      'contact.serverError': 'ችግር ተፈጥሯል። እባክዎ በቀጥታ ኢሜል ይላኩልኝ።',

      'media.noImage': 'ምስል የለም',
      'media.noPreview': 'ቅድመ እይታ የለም',
      'footer.brand.name': 'መልስ መላኪዬ',
      'footer.tagline': 'የዳታ ሳይንስ ተማሪ · ብልህ ስርዓቶችን መገንባት',
      'footer.copy': '© 2025 መልስ መላኬ· መብቱ በህግ የተጠበቀ ነው። <i class="fas fa-heart"></i>'
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
     ⚙️ CONFIG — THE ONLY PLACE YOU EDIT
     ============================================================ */
  const CONFIG = {

    email: 'melismelakie27@gmail.com',

    initialCounts: {
      projects:     3,
      experience:   3,
      certificates: 3,
      skills:       5,
      services:     3
    },

    jobTitles: {
      en: ['Data Scientist', 'ML Engineer', 'Data Analyst', 'Data visualizer and interpreter', 'AI Enthusiast'],
      am: ['የዳታ ሳይንቲስት', 'የML ኢንጂኒየር', 'የዳታ ተንታኝ', 'የPython ገንቢ', 'የAI አፍቃሪ']
    },
    jobRotateInterval: 2400,

    /* --- NAVIGATION --- */
    nav: [
      { id: 'home',         i18n: 'nav.home' },
      { id: 'about',        i18n: 'nav.about' },
      { id: 'education',    i18n: 'nav.education' },
      { id: 'skills',       i18n: 'nav.skills' },
      { id: 'projects',     i18n: 'nav.projects' },
      { id: 'experience',   i18n: 'nav.experience' },
      { id: 'certificates', i18n: 'nav.certificates' },
      { id: 'services',     i18n: 'nav.services' },
      { id: 'cv',           i18n: 'nav.cv' },
      { id: 'contact',      i18n: 'nav.contact' }
    ],

    homeMedia:  { type: 'image', src: 'profiles images/mele.jpg', alt: 'Melis Melakie profile' },
    aboutMedia: { type: 'image', src: 'profile images/meleb.jpg', alt: 'Working with data' },

    cv: {
      src: 'cv/Melis_Melakie_Shiferaw_CV-last.pdf',
      fileName: 'Melis-Melakie-CV.pdf'
    },

    /* --- EDUCATION (Elementary & High School removed permanently) --- */
    education: [
      { id: 'university', i18nTitle: 'edu.university.title', i18nSub: 'edu.university.sub',
        i18nDesc: 'edu.university.desc', i18nMeta: 'edu.university.meta',
        icon: 'fas fa-university',
        media: { type: 'video', src: '', alt: 'University' } },
      { id: 'online', i18nTitle: 'edu.online.title', i18nSub: 'edu.online.sub',
        i18nDesc: 'edu.online.desc', i18nMeta: 'edu.online.meta',
        icon: 'fas fa-laptop', media: { type: 'none', src: '' } }
    ],

    /* --- PROJECTS --- */
    projects: [
      { i18nTitle: 'proj.sentiment.title', i18nDesc: 'proj.sentiment.desc',
        i18nTags: ['tag.nlp','tag.ml','tag.python'],
        github: 'https://github.com/MELES-DS',
        live: '',
        details: { type: 'docx', src: '' },
        media: { type: 'pdf', src: 'certificates/demera/Improving Machine Learning Models.pdf', alt: 'Sentiment classification' } },

      { i18nTitle: 'proj.translation.title', i18nDesc: 'proj.translation.desc',
        i18nTags: ['tag.nlp','tag.ml','tag.tensorflow'],
        github: 'https://github.com/MELES-DS',
        live: '',
        details: { type: 'pdf', src: 'project images/Ethiopian language/Five ethiopian language and english bidirectional translation (1).pdf' },
        media: { type: 'image', src: 'project images/Ethiopian language/languages.png', alt: 'Multilingual translation' } },

      { i18nTitle: 'proj.water.title', i18nDesc: 'proj.water.desc',
        i18nTags: ['tag.timeseries','tag.ml','tag.python'],
        github: 'https://github.com/MELES-DS/water-level-prediction-for-ethiopian-hydropower-plants',
        live: '',
        details: { type: 'pdf', src: 'project images/EEp/Melis_project_document(EEP)_may_2026 (1).pdf' },
        media: { type: 'image', src: 'project images/EEp/Screenshot 2026-10-25 112321.png', alt: 'Water level forecasting' } },

      { i18nTitle: 'proj.aiimage.title', i18nDesc: 'proj.aiimage.desc',
        i18nTags: ['tag.tensorflow','tag.cnn','tag.ml'],
        github: 'https://github.com/Haymitadese/big-data-project',
        live: '',
        details: { type: 'pdf', src: 'project images/Fake and real images project/deepfake documentation.pdf' },
        media: { type: 'image', src: 'project images/Fake and real images project/fake.png', alt: 'AI image detection' } },

      { i18nTitle: 'proj.diabetes.title', i18nDesc: 'proj.diabetes.desc',
        i18nTags: ['tag.ml','tag.sklearn','tag.python'],
        github: 'https://github.com/MELES-DS/DATA-SCIENCE-CODES/blob/main/DATA%20SCIENCE/machine%20learning/Diabetis.ipynb',
        live: '',
        details: { type: 'pdf', src: 'project details/diabetes-prediction.pdf' },
        media: { type: 'image', src: 'profiles images/Diabet.png', alt: 'Diabetes prediction' } },

      { i18nTitle: 'proj.weather.title', i18nDesc: 'proj.weather.desc',
        i18nTags: ['tag.ml','tag.dataviz','tag.python'],
        github: 'https://github.com/MELES-DS/DATA-SCIENCE-CODES/blob/main/DATA%20SCIENCE/machine%20learning/machine%20learning%20project%20group%209.ipynb',
        live: '',
        details: { type: 'pptx', src: 'project details/weather-analysis.pptx' },
        media: { type: 'image', src: 'project images/weather prediction project/weather.png', alt: 'Weather analysis' } },

      { i18nTitle: 'proj.youth.title', i18nDesc: 'proj.youth.desc',
        i18nTags: ['tag.dataviz','tag.dash','tag.python'],
        github: 'https://github.com/MELES-DS',
        live: 'melismelakie.vercel.app',
        details: { type: 'pdf', src: 'project details/youth-center-dashboard.pdf' },
        media: { type: 'image', src: 'project images/DIY Attendance project/DIY.jpg', alt: 'Youth center attendance dashboard' } }
    ],

    /* --- EXPERIENCE --- */
    experienceCategories: [
      { key: 'internship',  i18nLabel: 'expcat.internship',  icon: 'fas fa-briefcase' },
      { key: 'freelance',   i18nLabel: 'expcat.freelance',   icon: 'fas fa-laptop-code' },
      { key: 'research',    i18nLabel: 'expcat.research',    icon: 'fas fa-flask' },
      { key: 'volunteer',   i18nLabel: 'expcat.volunteer',   icon: 'fas fa-code-branch' },
      { key: 'teaching',    i18nLabel: 'expcat.teaching',    icon: 'fas fa-chalkboard-user' },
      { key: 'competition', i18nLabel: 'expcat.competition', icon: 'fas fa-trophy' },
      { key: 'community',   i18nLabel: 'expcat.community',   icon: 'fas fa-people-group' }
    ],

    experience: [
      { i18nTitle: 'exp1.title', i18nCompany: 'exp1.company', i18nDesc: 'exp1.desc',
        i18nDuration: 'exp1.duration', i18nTags: ['exp1.tag1','exp1.tag2','exp1.tag3','exp1.tag4'],
        category: 'internship',  icon: 'fas fa-briefcase' },
      { i18nTitle: 'exp2.title', i18nCompany: 'exp2.company', i18nDesc: 'exp2.desc',
        i18nDuration: 'exp2.duration', i18nTags: ['exp2.tag1','exp2.tag2','exp2.tag3','exp2.tag4'],
        category: 'freelance',   icon: 'fas fa-laptop-code' },
      { i18nTitle: 'exp3.title', i18nCompany: 'exp3.company', i18nDesc: 'exp3.desc',
        i18nDuration: 'exp3.duration', i18nTags: ['exp3.tag1','exp3.tag2','exp3.tag3'],
        category: 'research',    icon: 'fas fa-flask' },
      { i18nTitle: 'exp4.title', i18nCompany: 'exp4.company', i18nDesc: 'exp4.desc',
        i18nDuration: 'exp4.duration', i18nTags: ['exp4.tag1','exp4.tag2','exp4.tag3'],
        category: 'volunteer',   icon: 'fas fa-code-branch' },
      { i18nTitle: 'exp5.title', i18nCompany: 'exp5.company', i18nDesc: 'exp5.desc',
        i18nDuration: 'exp5.duration', i18nTags: ['exp5.tag1','exp5.tag2','exp5.tag3'],
        category: 'teaching',    icon: 'fas fa-chalkboard-user' },
      { i18nTitle: 'exp6.title', i18nCompany: 'exp6.company', i18nDesc: 'exp6.desc',
        i18nDuration: 'exp6.duration', i18nTags: ['exp6.tag1','exp6.tag2','exp6.tag3'],
        category: 'competition', icon: 'fas fa-trophy' },
      { i18nTitle: 'exp7.title', i18nCompany: 'exp7.company', i18nDesc: 'exp7.desc',
        i18nDuration: 'exp7.duration', i18nTags: ['exp7.tag1','exp7.tag2','exp7.tag3'],
        category: 'community',   icon: 'fas fa-people-group' }
    ],

    /* --- CERTIFICATES --- */
    certificateCategories: [
      { key: 'oreilly',     i18nLabel: 'certcat.oreilly',     icon: 'fas fa-book' },
      { key: 'demera',      i18nLabel: 'certcat.demera',      icon: 'fas fa-hands-holding-heart' },
      { key: 'gebeya',      i18nLabel: 'certcat.gebeya',      icon: 'fas fa-laptop-code' },
      { key: 'kenexio',     i18nLabel: 'certcat.kenexio',     icon: 'fas fa-briefcase' },
      { key: 'club',        i18nLabel: 'certcat.club',        icon: 'fas fa-people-group' },
      { key: 'udacity',     i18nLabel: 'certcat.udacity',     icon: 'fas fa-graduation-cap' },
      { key: 'recognition', i18nLabel: 'certcat.recognition', icon: 'fas fa-trophy' },
      { key: 'other',       i18nLabel: 'certcat.other',       icon: 'fas fa-certificate' }
    ],

    certificates: [
      { i18nTitle: 'cert.udacity.progfund.title',      i18nDesc: 'cert.udacity.progfund.desc',      provider: 'Udacity',         category: 'udacity',     icon: 'fas fa-code',               preview: { type: 'pdf', src: 'certificates/udacity/Programming fundamentals.pdf' },       link: '#' },
      { i18nTitle: 'cert.udacity.dataanalysis.title',  i18nDesc: 'cert.udacity.dataanalysis.desc',  provider: 'Udacity',         category: 'udacity',     icon: 'fas fa-chart-line',         preview: { type: 'pdf', src: 'certificates/udacity/Data analysis.pdf' },                   link: '#' },
      { i18nTitle: 'cert.gebeya.aiessentials.title',   i18nDesc: 'cert.gebeya.aiessentials.desc',   provider: 'Gebeya',          category: 'gebeya',      icon: 'fas fa-robot',              preview: { type: 'pdf', src: 'certificates/gebeya/AI essentials for Everyones.pdf' },     link: '#' },
      { i18nTitle: 'cert.gebeya.cloudcomputing.title', i18nDesc: 'cert.gebeya.cloudcomputing.desc', provider: 'Gebeya',          category: 'gebeya',      icon: 'fas fa-cloud',              preview: { type: 'pdf', src: 'certificates/gebeya/cloud computing.pdf' },                  link: '#' },
      { i18nTitle: 'cert.gebeya.dsfundamentals.title', i18nDesc: 'cert.gebeya.dsfundamentals.desc', provider: 'Gebeya',          category: 'gebeya',      icon: 'fas fa-laptop-code',        preview: { type: 'pdf', src: 'certificates/gebeya/data science fundamentals.pdf' },        link: '#' },
      { i18nTitle: 'cert.gebeya.entrepreneurship.title',i18nDesc:'cert.gebeya.entrepreneurship.desc',provider: 'Gebeya',         category: 'gebeya',      icon: 'fas fa-lightbulb',          preview: { type: 'pdf', src: 'certificates/gebeya/Entrepreneurship.pdf' },                 link: '#' },
      { i18nTitle: 'cert.gebeya.langcomm.title',       i18nDesc: 'cert.gebeya.langcomm.desc',       provider: 'Gebeya',          category: 'gebeya',      icon: 'fas fa-comments',           preview: { type: 'pdf', src: 'certificates/gebeya/language and communication skill.pdf' }, link: '#' },
      { i18nTitle: 'cert.gebeya.powerbi.title',        i18nDesc: 'cert.gebeya.powerbi.desc',        provider: 'Gebeya',          category: 'gebeya',      icon: 'fas fa-chart-bar',          preview: { type: 'pdf', src: 'certificates/gebeya/Power BI.pdf' },                         link: '#' },
      { i18nTitle: 'cert.gebeya.prodai.title',         i18nDesc: 'cert.gebeya.prodai.desc',         provider: 'Gebeya',          category: 'gebeya',      icon: 'fas fa-lightbulb',          preview: { type: 'pdf', src: 'certificates/gebeya/product creation with AI_advanced level.pdf' }, link: '#' },
      { i18nTitle: 'cert.oreilly.aisecurity.title',    i18nDesc: 'cert.oreilly.aisecurity.desc',    provider: "O'Reilly",        category: 'oreilly',     icon: 'fas fa-robot',              preview: { type: 'pdf', src: 'certificates/others/AI Security & Ethics.pdf' },             link: '#' },
      { i18nTitle: 'cert.oreilly.chatgpteng.title',    i18nDesc: 'cert.oreilly.chatgpteng.desc',    provider: "O'Reilly",        category: 'oreilly',     icon: 'fas fa-database',           preview: { type: 'pdf', src: 'certificates/oreilly/CHAT GPT engineering.pdf' },            link: '#' },
      { i18nTitle: 'cert.oreilly.awscloud.title',      i18nDesc: 'cert.oreilly.awscloud.desc',      provider: "O'Reilly",        category: 'oreilly',     icon: 'fas fa-hands-holding-heart',preview: { type: 'pdf', src: 'certificates/oreilly/cloud computing with aws.pdf' },        link: '#' },
      { i18nTitle: 'cert.oreilly.pyaz.title',          i18nDesc: 'cert.oreilly.pyaz.desc',          provider: "O'Reilly",        category: 'oreilly',     icon: 'fas fa-python',             preview: { type: 'pdf', src: 'certificates/oreilly/Python A-Z_ 15 Projects.pdf' },         link: '#' },
      { i18nTitle: 'cert.oreilly.dsmlaz.title',        i18nDesc: 'cert.oreilly.dsmlaz.desc',        provider: "O'Reilly",        category: 'oreilly',     icon: 'fas fa-brain',              preview: { type: 'pdf', src: 'certificates/oreilly/Data Science & ML A to Z.pdf' },        link: '#' },
      { i18nTitle: 'cert.oreilly.dmanalytics.title',   i18nDesc: 'cert.oreilly.dmanalytics.desc',   provider: "O'Reilly",        category: 'oreilly',     icon: 'fas fa-chart-pie',          preview: { type: 'pdf', src: 'certificates/oreilly/Digital marketing analytics.pdf' },     link: '#' },
      { i18nTitle: 'cert.oreilly.mlpy.title',          i18nDesc: 'cert.oreilly.mlpy.desc',          provider: "O'Reilly",        category: 'oreilly',     icon: 'fas fa-cogs',               preview: { type: 'pdf', src: 'certificates/oreilly/ML in python for Everyones.pdf' },      link: '#' },
      { i18nTitle: 'cert.oreilly.mlproj.title',        i18nDesc: 'cert.oreilly.mlproj.desc',        provider: "O'Reilly",        category: 'oreilly',     icon: 'fas fa-project-diagram',    preview: { type: 'pdf', src: 'certificates/oreilly/ML Projects_ Beginner to Pro.pdf' },    link: '#' },
      { i18nTitle: 'cert.oreilly.mlgenai.title',       i18nDesc: 'cert.oreilly.mlgenai.desc',       provider: "O'Reilly",        category: 'oreilly',     icon: 'fas fa-network-wired',      preview: { type: 'pdf', src: 'certificates/oreilly/ML, Data Science & GenAI.pdf' },        link: '#' },
      { i18nTitle: 'cert.oreilly.pbimaster.title',     i18nDesc: 'cert.oreilly.pbimaster.desc',     provider: "O'Reilly",        category: 'oreilly',     icon: 'fas fa-tachometer-alt',     preview: { type: 'pdf', src: 'certificates/oreilly/Power BI Masterclass.pdf' },            link: '#' },
      { i18nTitle: 'cert.demera.improvingml.title',    i18nDesc: 'cert.demera.improvingml.desc',    provider: 'Demera Project',  category: 'demera',      icon: 'fas fa-hands-holding-heart',preview: { type: 'pdf', src: 'certificates/demera/Improving Machine Learning Models.pdf' }, link: '#' },
      { i18nTitle: 'cert.demera.mlspecialist.title',   i18nDesc: 'cert.demera.mlspecialist.desc',   provider: 'Demera Project',  category: 'demera',      icon: 'fas fa-users',              preview: { type: 'image', src: 'certificates/demera/machine learning specialist.png', alt: 'ML Specialist' }, link: '#' },
      { i18nTitle: 'cert.demera.datavizbasics.title',  i18nDesc: 'cert.demera.datavizbasics.desc',  provider: 'Demera Project',  category: 'demera',      icon: 'fas fa-chart-pie',          preview: { type: 'pdf', src: 'certificates/demera/Data Visualization Basics.pdf' },        link: '#' },
      { i18nTitle: 'cert.demera.communityanalytics.title',i18nDesc:'cert.demera.communityanalytics.desc',provider:'Demera Project', category: 'demera',      icon: 'fas fa-users',              preview: { type: 'pdf', src: 'certificates/demera/Improving Machine Learning Models.pdf' }, link: '#' },
      { i18nTitle: 'cert.demera.mlpipelines.title',    i18nDesc: 'cert.demera.mlpipelines.desc',    provider: 'Demera Project',  category: 'demera',      icon: 'fas fa-project-diagram',    preview: { type: 'image', src: 'certificates/demera/machine learning pipelines.png' },     link: '#' },
      { i18nTitle: 'cert.demera.dataprivacy.title',    i18nDesc: 'cert.demera.dataprivacy.desc',    provider: 'Demera Project',  category: 'demera',      icon: 'fas fa-shield-alt',         preview: { type: 'image', src: 'certificates/demera/principle of data privacy.png' },     link: '#' },
      { i18nTitle: 'cert.kenexio.progfund.title',      i18nDesc: 'cert.kenexio.progfund.desc',      provider: 'Kenexio',         category: 'kenexio',     icon: 'fas fa-database',           preview: { type: 'pdf', src: 'certificates/kenexio/Programming fundamentals.pdf' },        link: '#' },
      { i18nTitle: 'cert.kenexio.powerbi.title',       i18nDesc: 'cert.kenexio.powerbi.desc',       provider: 'Kenexio',         category: 'kenexio',     icon: 'fas fa-chart-pie',          preview: { type: 'none', src: '' },                                                        link: '#' },
      { i18nTitle: 'cert.club.dataclublead.title',     i18nDesc: 'cert.club.dataclublead.desc',     provider: 'Data Club',       category: 'club',        icon: 'fas fa-people-group',       preview: { type: 'image', src: '', alt: 'Club Lead' },                                     link: '#' },
      { i18nTitle: 'cert.club.artificialintel.title',  i18nDesc: 'cert.club.artificialintel.desc',  provider: 'Tech Club',       category: 'club',        icon: 'fas fa-trophy',             preview: { type: 'pdf', src: 'certificates/club/Artificial intelligence.pdf' },            link: '#' },
      { i18nTitle: 'cert.recognition.deanslist.title', i18nDesc: 'cert.recognition.deanslist.desc', provider: 'University',      category: 'recognition', icon: 'fas fa-medal',              preview: { type: 'image', src: '', alt: "Dean's List" },                                    link: '#' },
      { i18nTitle: 'cert.recognition.capstone.title',  i18nDesc: 'cert.recognition.capstone.desc',  provider: 'DS Department',   category: 'recognition', icon: 'fas fa-award',              preview: { type: 'pdf', src: 'certificates/recognition/Data analysis.pdf' },               link: '#' },
      { i18nTitle: 'cert.other.udara.title',           i18nDesc: 'cert.other.udara.desc',           provider: 'Google',          category: 'other',       icon: 'fas fa-certificate',        preview: { type: 'pdf', src: 'certificates/others/udara-certificate.pdf' },                link: '#' },
      { i18nTitle: 'cert.other.cloudroles.title',      i18nDesc: 'cert.other.cloudroles.desc',      provider: 'DeepLearning.AI', category: 'other',       icon: 'fas fa-network-wired',      preview: { type: 'pdf', src: 'certificates/others/Job Roles in the Cloud.pdf' },           link: '#' }
    ],

    /* --- SERVICES --- */
    serviceCategories: [
      { key: 'data-analysis', i18nLabel: 'srvcat.data-analysis', icon: 'fas fa-chart-bar' },
      { key: 'ml',            i18nLabel: 'srvcat.ml',            icon: 'fas fa-brain' },
      { key: 'dataviz',       i18nLabel: 'srvcat.dataviz',       icon: 'fas fa-chart-pie' },
      { key: 'consulting',    i18nLabel: 'srvcat.consulting',    icon: 'fas fa-lightbulb' },
      { key: 'training',      i18nLabel: 'srvcat.training',      icon: 'fas fa-chalkboard-user' }
    ],

    services: [
      { i18nJob: 'srv1.job', i18nCompany: 'srv1.company', i18nDuration: 'srv1.duration',
        i18nDesc: 'srv1.desc', i18nTags: ['srv1.tag1','srv1.tag2','srv1.tag3','srv1.tag4'],
        category: 'data-analysis', icon: 'fas fa-chart-bar' },
      { i18nJob: 'srv2.job', i18nCompany: 'srv2.company', i18nDuration: 'srv2.duration',
        i18nDesc: 'srv2.desc', i18nTags: ['srv2.tag1','srv2.tag2','srv2.tag3'],
        category: 'ml',            icon: 'fas fa-brain' },
      { i18nJob: 'srv3.job', i18nCompany: 'srv3.company', i18nDuration: 'srv3.duration',
        i18nDesc: 'srv3.desc', i18nTags: ['srv3.tag1','srv3.tag2','srv3.tag3'],
        category: 'dataviz',       icon: 'fas fa-chart-pie' },
      { i18nJob: 'srv4.job', i18nCompany: 'srv4.company', i18nDuration: 'srv4.duration',
        i18nDesc: 'srv4.desc', i18nTags: ['srv4.tag1','srv4.tag2','srv4.tag3'],
        category: 'consulting',    icon: 'fas fa-lightbulb' },
      { i18nJob: 'srv5.job', i18nCompany: 'srv5.company', i18nDuration: 'srv5.duration',
        i18nDesc: 'srv5.desc', i18nTags: ['srv5.tag1','srv5.tag2','srv5.tag3'],
        category: 'training',      icon: 'fas fa-chalkboard-user' }
    ],

    /* --- SKILLS --- */
    skillCategories: [
      { key: 'programming',  i18nLabel: 'cat.programming',  icon: 'fab fa-python' },
      { key: 'datasci',      i18nLabel: 'cat.datasci',      icon: 'fas fa-chart-line' },
      { key: 'mlai',         i18nLabel: 'cat.mlai',         icon: 'fas fa-robot' },
      { key: 'tools',        i18nLabel: 'cat.tools',        icon: 'fas fa-screwdriver-wrench' },
      { key: 'soft',         i18nLabel: 'cat.soft',         icon: 'fas fa-handshake' },
      { key: 'other',        i18nLabel: 'cat.other',        icon: 'fas fa-cube' }
    ],

    skills: [
      { i18nName: 'skill.python',      icon: 'fab fa-python',               category: 'programming', i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.r',           icon: 'fab fa-r-project',            category: 'programming', i18nLevel: 'lvl.intermediate' },
      { i18nName: 'skill.sql',         icon: 'fas fa-database',             category: 'programming', i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.java',        icon: 'fab fa-java',                 category: 'programming', i18nLevel: 'lvl.basic' },
      { i18nName: 'skill.javascript',  icon: 'fab fa-js',                   category: 'programming', i18nLevel: 'lvl.intermediate' },
      { i18nName: 'skill.htmlcss',     icon: 'fab fa-html5',                category: 'programming', i18nLevel: 'lvl.intermediate' },

      { i18nName: 'skill.dataclean',   icon: 'fas fa-broom',                category: 'datasci',     i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.eda',         icon: 'fas fa-search',               category: 'datasci',     i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.statistical', icon: 'fas fa-chart-area',           category: 'datasci',     i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.dataviz',     icon: 'fas fa-chart-pie',            category: 'datasci',     i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.excel',       icon: 'fas fa-file-excel',           category: 'datasci',     i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.powerbi',     icon: 'fas fa-chart-bar',            category: 'datasci',     i18nLevel: 'lvl.intermediate' },
      { i18nName: 'skill.pandas',      icon: 'fas fa-table',                category: 'datasci',     i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.numpy',       icon: 'fas fa-calculator',           category: 'datasci',     i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.matplotlib',  icon: 'fas fa-chart-line',           category: 'datasci',     i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.matlab',      icon: 'fas fa-square-root-variable', category: 'datasci',     i18nLevel: 'lvl.intermediate' },
      { i18nName: 'skill.spss',        icon: 'fas fa-chart-simple',         category: 'datasci',     i18nLevel: 'lvl.intermediate' },

      { i18nName: 'skill.ml',          icon: 'fas fa-brain',                category: 'mlai',        i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.dl',          icon: 'fas fa-network-wired',        category: 'mlai',        i18nLevel: 'lvl.intermediate' },
      { i18nName: 'skill.nlp',         icon: 'fas fa-language',             category: 'mlai',        i18nLevel: 'lvl.intermediate' },
      { i18nName: 'skill.cv',          icon: 'fas fa-eye',                  category: 'mlai',        i18nLevel: 'lvl.intermediate' },
      { i18nName: 'skill.predictive',  icon: 'fas fa-chart-line',           category: 'mlai',        i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.modeleval',   icon: 'fas fa-check-double',         category: 'mlai',        i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.featureeng',  icon: 'fas fa-sliders-h',            category: 'mlai',        i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.tensorflow',  icon: 'fas fa-project-diagram',      category: 'mlai',        i18nLevel: 'lvl.intermediate' },
      { i18nName: 'skill.pytorch',     icon: 'fas fa-fire',                 category: 'mlai',        i18nLevel: 'lvl.intermediate' },
      { i18nName: 'skill.sklearn',     icon: 'fas fa-cogs',                 category: 'mlai',        i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.dashboard',   icon: 'fas fa-tachometer-alt',       category: 'mlai',        i18nLevel: 'lvl.advanced' },

      { i18nName: 'skill.jupyter',     icon: 'fas fa-book',                 category: 'tools',       i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.colab',       icon: 'fas fa-flask',                category: 'tools',       i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.kaggle',      icon: 'fab fa-kaggle',               category: 'tools',       i18nLevel: 'lvl.intermediate' },
      { i18nName: 'skill.vscode',      icon: 'fas fa-code',                 category: 'tools',       i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.git',         icon: 'fab fa-git-alt',              category: 'tools',       i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.github',      icon: 'fab fa-github',               category: 'tools',       i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.gradio',      icon: 'fas fa-rocket',               category: 'tools',       i18nLevel: 'lvl.intermediate' },
      { i18nName: 'skill.streamlit',   icon: 'fas fa-bolt',                 category: 'tools',       i18nLevel: 'lvl.intermediate' },

      { i18nName: 'skill.problem',       icon: 'fas fa-lightbulb',          category: 'soft',        i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.critical',      icon: 'fas fa-brain',              category: 'soft',        i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.teamwork',      icon: 'fas fa-people-group',       category: 'soft',        i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.communication', icon: 'fas fa-comments',           category: 'soft',        i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.presentation',  icon: 'fas fa-chalkboard-user',    category: 'soft',        i18nLevel: 'lvl.intermediate' },
      { i18nName: 'skill.projectmgmt',   icon: 'fas fa-tasks',              category: 'soft',        i18nLevel: 'lvl.intermediate' },
      { i18nName: 'skill.time',          icon: 'fas fa-clock',              category: 'soft',        i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.learning',      icon: 'fas fa-graduation-cap',     category: 'soft',        i18nLevel: 'lvl.advanced' },

      { i18nName: 'skill.cloud',       icon: 'fas fa-cloud',                category: 'other',       i18nLevel: 'lvl.intermediate' },
      { i18nName: 'skill.databases',   icon: 'fas fa-database',             category: 'other',       i18nLevel: 'lvl.advanced' },
      { i18nName: 'skill.qc',          icon: 'fas fa-clipboard-check',      category: 'other',       i18nLevel: 'lvl.intermediate' }
    ],

    /* --- SOCIAL --- */
    social: [
      { name: 'LinkedIn',  icon: 'fab fa-linkedin-in', url: 'https://linkedin.com/in/melismelakie', cls: 'linkedin' },
      { name: 'GitHub',    icon: 'fab fa-github',      url: 'https://github.com/MELES-DS',          cls: 'github' },
      { name: 'Telegram',  icon: 'fab fa-telegram',    url: 'https://t.me/Mele2927',                cls: 'telegram' },
      { name: 'WhatsApp',  icon: 'fab fa-whatsapp',    url: 'https://wa.me/251945637373',           cls: 'whatsapp' },
      { name: 'Facebook',  icon: 'fab fa-facebook-f',  url: 'https://facebook.com/melis.melakie',                cls: 'facebook' },
      { name: 'Instagram', icon: 'fab fa-instagram',   url: 'https://instagram.com/mele292721',               cls: 'instagram' },
      { name: 'Discord',   icon: 'fab fa-discord',     url: 'https://discord.com/mele2927',                 cls: 'discord' },
      { name: 'Pinterest', icon: 'fab fa-pinterest-p', url: 'https://pinterest.com/',               cls: 'pinterest' },
      { name: 'Twitter/X', icon: 'fab fa-x-twitter',   url: 'https://x.com/@MelakieMel38871',                       cls: 'twitter' },
      { name: 'Reddit',    icon: 'fab fa-reddit-alien',url: 'https://reddit.com/u/OkPomelo6843',                  cls: 'reddit' }
    ]
  };

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
    p = p.replace(/\\/g, '/').replace(/\/{2,}/g, '/');
    return p;
  }

  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function hasValue(v) {
    return typeof v === 'string' && v.trim() !== '' && v.trim() !== '#';
  }

  /* ============================================================
     LIGHTBOX
     ============================================================ */
  const lightbox        = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  const lightboxClose   = document.getElementById('lightboxClose');

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
      const wrap = el('div', 'lightbox-pdf-wrap');
      wrap.style.cssText =
        'width:90vw;height:90vh;max-width:1400px;overflow:auto;background:#525659;' +
        'padding:1rem;display:flex;flex-direction:column;gap:1rem;align-items:center;';
      lightboxContent.appendChild(wrap);

      loadPdfJs().then(function (pdfjsLib) {
        return pdfjsLib.getDocument(src).promise;
      }).then(function (pdf) {
        let chain = Promise.resolve();
        for (let n = 1; n <= pdf.numPages; n++) {
          (function (pageNum) {
            chain = chain
              .then(function () { return renderPdfPageToCanvas(pdf, pageNum, 1.8); })
              .then(function (canvas) {
                canvas.style.cssText =
                  'max-width:100%;height:auto;display:block;background:#fff;' +
                  'box-shadow:0 4px 14px rgba(0,0,0,0.4);border-radius:4px;';
                wrap.appendChild(canvas);
              });
          })(n);
        }
        return chain;
      }).catch(function (err) {
        console.error('PDF.js lightbox error:', err);
        wrap.innerHTML =
          '<div style="color:#fff;font-weight:600;padding:2rem;text-align:center;">' +
          'Could not render this PDF.' +
          '</div>';
      });
    } else if (media.type === 'video') {
      const video = document.createElement('video');
      video.src = src;
      video.controls = true; video.autoplay = true;
      video.loop = true; video.playsInline = true;
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
        const empty = el('div', opts.emptyClass || 'media-empty',
          '<i class="fas fa-image"></i><span>' +
          (opts.emptyLabel || t('media.noImage')) + '</span>');
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
      const box = el('div', 'media-error-box',
        '<i class="fas ' + (icon || 'fa-image') + '"></i><span>' +
        (opts.emptyLabel || t('media.noImage')) + '</span>');
      container.appendChild(box);
    }

    if (type === 'pdf') {
      const wrap = document.createElement('div');
      wrap.style.cssText =
        'position:absolute;inset:0;overflow:hidden;background:#fff;' +
        'display:flex;align-items:flex-start;justify-content:center;';
      container.appendChild(wrap);

      loadPdfJs().then(function (pdfjsLib) {
        return pdfjsLib.getDocument(src).promise;
      }).then(function (pdf) {
        return renderPdfPageToCanvas(pdf, 1, 1.5);
      }).then(function (canvas) {
        canvas.style.cssText =
          'width:100%;height:100%;object-fit:cover;display:block;background:#fff;' +
          'object-position:top center;';
        wrap.appendChild(canvas);
        container.classList.add('media-ready');
      }).catch(function (err) {
        console.error('PDF.js card error:', err);
        showError('fa-file-pdf');
      });

      setTimeout(function () { container.classList.add('media-ready'); }, 4000);
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
      video.addEventListener('canplay',     function () { container.classList.add('media-ready'); });
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
    const el2 = document.getElementById('jobRotator');
    if (!el2) return;
    if (rotatorTimer) clearInterval(rotatorTimer);

    const titles = (CONFIG.jobTitles[currentLang] && CONFIG.jobTitles[currentLang].length)
      ? CONFIG.jobTitles[currentLang]
      : CONFIG.jobTitles.en;

    rotatorIndex = 0;
    el2.textContent = titles[0];
    el2.classList.remove('fade-out');
    el2.classList.add('fade-in');

    rotatorTimer = setInterval(function () {
      el2.classList.remove('fade-in');
      el2.classList.add('fade-out');
      setTimeout(function () {
        rotatorIndex = (rotatorIndex + 1) % titles.length;
        el2.textContent = titles[rotatorIndex];
        el2.classList.remove('fade-out');
        el2.classList.add('fade-in');
      }, 320);
    }, CONFIG.jobRotateInterval);
  }

  /* ============================================================
     GENERIC FILTERED SECTION FACTORY
     ============================================================ */
  function createFilteredSection(opts) {
    const state = { currentCategory: null, expanded: false, rendered: 0 };

    function grid()    { return document.getElementById(opts.containerId); }
    function wrap()    { return document.getElementById(opts.viewMoreWrapId); }
    function moreBtn() { return document.getElementById(opts.viewMoreBtnId); }

    function updateBtn() {
      const btn = moreBtn();
      if (!btn) return;
      btn.innerHTML = '<span>' + t(state.expanded ? 'projects.viewLess' : 'projects.viewMore') +
                      '</span><i class="fas fa-chevron-down"></i>';
      btn.setAttribute('data-expanded', String(state.expanded));
    }

    function buildFilterBar() {
      const bar = document.getElementById(opts.filterBarId);
      if (!bar) return;
      bar.innerHTML = '';
      opts.categories.forEach(function (cat, i) {
        const count = opts.items.filter(function (it) { return it.category === cat.key; }).length;
        const btn = el('button', 'filter-btn' + (i === 0 ? ' active' : ''));
        btn.dataset.category = cat.key;
        btn.innerHTML =
          '<i class="' + cat.icon + '"></i>' +
          '<span class="filter-btn-label">' + t(cat.i18nLabel) + '</span>' +
          (opts.showCountBadge !== false ? '<span class="count-badge">' + count + '</span>' : '');
        btn.addEventListener('click', function () {
          state.currentCategory = cat.key;
          bar.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          render(cat.key);
        });
        bar.appendChild(btn);
      });
      if (opts.categories.length > 0) {
        state.currentCategory = opts.categories[0].key;
        render(state.currentCategory);
      }
    }

    function render(category) {
      const g = grid();
      if (!g) return;
      g.innerHTML = '';
      state.rendered = 0;
      state.expanded = false;

      if (!category) {
        g.innerHTML = '<div class="empty-state"><i class="fas fa-hand-pointer"></i>' +
                      t('skills.selectCategory') + '</div>';
        if (wrap()) wrap().style.display = 'none';
        updateBtn();
        return;
      }

      const filtered = opts.items.filter(function (it) { return it.category === category; });
      if (filtered.length === 0) {
        g.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i>' +
                      t(opts.emptyLabel) + '</div>';
        if (wrap()) wrap().style.display = 'none';
        updateBtn();
        return;
      }

      const initial = Math.min(opts.initialCount, filtered.length);
      for (let i = 0; i < initial; i++) {
        g.appendChild(opts.buildCard(filtered[i]));
        state.rendered++;
      }
      if (wrap()) wrap().style.display = (filtered.length > initial) ? 'block' : 'none';
      updateBtn();
    }

    function toggle() {
      const g = grid();
      if (!g || !state.currentCategory) return;
      const filtered = opts.items.filter(function (it) { return it.category === state.currentCategory; });
      const initial = Math.min(opts.initialCount, filtered.length);

      if (!state.expanded) {
        for (let i = state.rendered; i < filtered.length; i++) {
          g.appendChild(opts.buildCard(filtered[i]));
        }
        state.rendered = filtered.length;
        state.expanded = true;
      } else {
        g.querySelectorAll('.' + opts.cardSelector).forEach(function (c, idx) {
          if (idx >= initial) c.classList.add('hidden');
        });
        state.expanded = false;
      }
      updateBtn();
    }

    function initViewMore() {
      const btn = moreBtn();
      if (!btn) return;
      btn.addEventListener('click', toggle);
    }

    function updateTotalBadge() {
      const badge = document.getElementById(opts.totalBadgeId);
      if (badge) badge.textContent = opts.items.length;
    }

    return {
      rebuild: function () {
        buildFilterBar();
        updateTotalBadge();
      },
      initViewMore: initViewMore
    };
  }

  /* ============================================================
     CARD BUILDERS
     ============================================================ */
  function buildProjectCard(p) {
    const card = el('div', 'project-card');

    const mediaEl = el('div', 'project-media');
    renderMediaInto(mediaEl, p.media, {
      showEmpty: true, emptyClass: 'media-empty', emptyLabel: t('media.noImage')
    });

    const body = el('div', 'project-body');
    body.appendChild(el('h3', null, t(p.i18nTitle)));

    const desc = el('p', 'project-desc');
    desc.textContent = t(p.i18nDesc);
    body.appendChild(desc);

    const tags = el('div', 'project-tags');
    (p.i18nTags || []).forEach(function (tagKey) {
      tags.appendChild(el('span', 'tag', t(tagKey)));
    });
    body.appendChild(tags);

    const actions = el('div', 'project-actions');

    if (hasValue(p.live)) {
      const live = document.createElement('a');
      live.href = p.live;
      live.target = '_blank';
      live.rel = 'noopener noreferrer';
      live.className = 'project-btn project-btn-live';
      live.innerHTML = '<i class="fas fa-external-link-alt"></i> ' + t('projects.liveDemo');
      actions.appendChild(live);
    }

    if (hasValue(p.github)) {
      const gh = document.createElement('a');
      gh.href = p.github;
      gh.target = '_blank';
      gh.rel = 'noopener noreferrer';
      gh.className = 'project-btn project-btn-github';
      gh.innerHTML = '<i class="fab fa-github"></i> ' + t('projects.github');
      actions.appendChild(gh);
    }

    if (p.details && hasValue(p.details.src)) {
      const details = document.createElement('button');
      details.type = 'button';
      details.className = 'project-btn project-btn-details';
      details.innerHTML = '<i class="fas fa-file-lines"></i> ' + t('projects.viewDetails');
      details.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const src = asset(normalizePath(p.details.src));
        window.open(
          src,
          '_blank',
          'noopener,noreferrer,width=1200,height=850,left=80,top=60'
        );
      });
      actions.appendChild(details);
    }

    if (actions.children.length > 0) {
      body.appendChild(actions);
    }

    card.appendChild(mediaEl);
    card.appendChild(body);
    return card;
  }

  function buildExperienceCard(exp) {
    const card = el('div', 'exp-card');
    const tagHTML = (exp.i18nTags || []).map(function (k) {
      return '<span class="exp-tag">' + t(k) + '</span>';
    }).join('');

    card.innerHTML =
      '<div class="exp-header">' +
        '<div class="exp-logo"><i class="' + exp.icon + '"></i></div>' +
        '<div class="exp-header-text">' +
          '<div class="exp-title">' + t(exp.i18nTitle) + '</div>' +
          '<div class="exp-company"><i class="fas fa-building"></i> ' + t(exp.i18nCompany) + '</div>' +
        '</div>' +
      '</div>' +
      '<span class="exp-duration"><i class="fas fa-calendar-alt"></i> ' + t(exp.i18nDuration) + '</span>' +
      '<p class="exp-desc">' + t(exp.i18nDesc) + '</p>' +
      '<div class="exp-tags">' + tagHTML + '</div>';
    return card;
  }

  function buildSkillCard(skill) {
    const card = el('div', 'skill-card');
    card.innerHTML =
      '<i class="' + skill.icon + '"></i>' +
      '<span>' + t(skill.i18nName) + '</span>' +
      '<span class="skill-level">' + t(skill.i18nLevel) + '</span>';
    return card;
  }

  function buildCertificateCard(cert) {
    const card = el('div', 'cert-card');

    const previewEl = el('div', 'cert-preview');
    renderMediaInto(previewEl, cert.preview, {
      showEmpty: true, emptyClass: 'cert-preview-empty', emptyLabel: t('media.noPreview')
    });

    const top = el('div', 'cert-top');
    top.innerHTML =
      '<div class="cert-icon"><i class="' + cert.icon + '"></i></div>' +
      '<div class="cert-header-text">' +
        '<div class="cert-title">' + t(cert.i18nTitle) + '</div>' +
        '<div class="cert-provider">' + cert.provider + '</div>' +
      '</div>';

    const desc = el('p', 'cert-desc');
    desc.textContent = t(cert.i18nDesc);

    const footer = el('div', 'cert-footer');
    if (cert.link && cert.link !== '#') {
      const verify = document.createElement('a');
      verify.href = cert.link;
      verify.target = '_blank';
      verify.rel = 'noopener noreferrer';
      verify.className = 'cert-verify';
      verify.innerHTML = t('certs.view') + ' <i class="fas fa-arrow-right"></i>';
      footer.appendChild(verify);
    }

    card.appendChild(previewEl);
    card.appendChild(top);
    card.appendChild(desc);
    card.appendChild(footer);
    return card;
  }

  function buildServiceCard(srv) {
    const card = el('div', 'srv-card');
    const tagHTML = (srv.i18nTags || []).map(function (k) {
      return '<span class="srv-tag">' + t(k) + '</span>';
    }).join('');

    card.innerHTML =
      '<div class="srv-header">' +
        '<div class="srv-logo"><i class="' + srv.icon + '"></i></div>' +
        '<div class="srv-header-text">' +
          '<div class="srv-title">' + t(srv.i18nJob) + '</div>' +
          '<div class="srv-company"><i class="fas fa-briefcase"></i> ' + t(srv.i18nCompany) + '</div>' +
        '</div>' +
      '</div>' +
      '<span class="srv-duration"><i class="fas fa-clock"></i> ' + t(srv.i18nDuration) + '</span>' +
      '<p class="srv-desc">' + t(srv.i18nDesc) + '</p>' +
      '<div class="srv-tags">' + tagHTML + '</div>';
    return card;
  }

  /* ============================================================
     INSTANTIATE FILTERED SECTIONS
     ============================================================ */
  const experienceSection = createFilteredSection({
    containerId: 'experienceGrid',
    filterBarId: 'expFilterBar',
    viewMoreWrapId: 'expViewMoreWrap',
    viewMoreBtnId: 'expViewMoreBtn',
    totalBadgeId: 'expTotalCount',
    cardSelector: 'exp-card',
    items: CONFIG.experience,
    categories: CONFIG.experienceCategories,
    buildCard: buildExperienceCard,
    initialCount: CONFIG.initialCounts.experience,
    emptyLabel: 'exp.empty'
  });

  const certificatesSection = createFilteredSection({
    containerId: 'certificatesGrid',
    filterBarId: 'certsFilterBar',
    viewMoreWrapId: 'certsViewMoreWrap',
    viewMoreBtnId: 'certsViewMoreBtn',
    totalBadgeId: 'certsTotalCount',
    cardSelector: 'cert-card',
    items: CONFIG.certificates,
    categories: CONFIG.certificateCategories,
    buildCard: buildCertificateCard,
    initialCount: CONFIG.initialCounts.certificates,
    emptyLabel: 'certs.empty'
  });

  const servicesSection = createFilteredSection({
    containerId: 'servicesGrid',
    filterBarId: 'srvFilterBar',
    viewMoreWrapId: 'srvViewMoreWrap',
    viewMoreBtnId: 'srvViewMoreBtn',
    totalBadgeId: null,
    cardSelector: 'srv-card',
    items: CONFIG.services,
    categories: CONFIG.serviceCategories,
    buildCard: buildServiceCard,
    initialCount: CONFIG.initialCounts.services,
    emptyLabel: 'srv.empty'
  });

  const skillsSection = createFilteredSection({
    containerId: 'skillsGrid',
    filterBarId: 'skillsFilterBar',
    viewMoreWrapId: 'skillsViewMoreWrap',
    viewMoreBtnId: 'skillsViewMoreBtn',
    totalBadgeId: null,
    cardSelector: 'skill-card',
    items: CONFIG.skills,
    categories: CONFIG.skillCategories,
    buildCard: buildSkillCard,
    initialCount: CONFIG.initialCounts.skills,
    emptyLabel: 'skills.empty',
    showCountBadge: false
  });

  /* ============================================================
     PROJECTS — special case (no categories)
     ============================================================ */
  let projectsExpanded = false;
  let projectsRendered = 0;

  function renderProjects() {
    const container = document.getElementById('projectsContainer');
    const wrap = document.getElementById('projectsViewMoreWrap');
    if (!container) return;
    container.innerHTML = '';
    projectsRendered = 0;
    projectsExpanded = false;

    const initial = Math.min(CONFIG.initialCounts.projects, CONFIG.projects.length);
    for (let i = 0; i < initial; i++) {
      container.appendChild(buildProjectCard(CONFIG.projects[i]));
      projectsRendered++;
    }
    if (wrap) wrap.style.display = (CONFIG.projects.length > initial) ? 'block' : 'none';
    updateProjectsBtn();

    const badge = document.getElementById('projectsTotalCount');
    if (badge) badge.textContent = CONFIG.projects.length;
  }

  function updateProjectsBtn() {
    const btn = document.getElementById('projectsViewMoreBtn');
    if (!btn) return;
    btn.innerHTML = '<span>' + t(projectsExpanded ? 'projects.viewLess' : 'projects.viewMore') +
                    '</span><i class="fas fa-chevron-down"></i>';
    btn.setAttribute('data-expanded', String(projectsExpanded));
  }

  function toggleProjects() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;
    const total = CONFIG.projects.length;
    const initial = Math.min(CONFIG.initialCounts.projects, total);

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
    btn.addEventListener('click', toggleProjects);
  }

  /* ============================================================
     EDUCATION — now only University + Online
     ============================================================ */
  function renderEducation() {
    const grid = document.getElementById('educationGrid');
    if (!grid) return;
    grid.innerHTML = '';
    CONFIG.education.forEach(function (edu) {
      const card = el('div', 'edu-card');
      const header = el('div', 'edu-header');
      header.innerHTML =
        '<div class="edu-icon"><i class="' + edu.icon + '"></i></div>' +
        '<div>' +
          '<div class="edu-title">' + t(edu.i18nTitle) + '</div>' +
          '<div class="edu-sub">' + t(edu.i18nSub) + '</div>' +
        '</div>' +
        '<i class="fas fa-chevron-down edu-arrow"></i>';

      const body = el('div', 'edu-body');
      const p = document.createElement('p');
      p.textContent = t(edu.i18nDesc);
      body.appendChild(p);

      if (edu.media && edu.media.src) {
        const mediaWrap = el('div', 'edu-media');
        renderMediaInto(mediaWrap, edu.media, {});
        body.appendChild(mediaWrap);
      }
      if (edu.i18nMeta) {
        const meta = el('div', 'edu-meta',
          '<i class="fas fa-calendar-alt"></i> ' + t(edu.i18nMeta));
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

  /* ============================================================
     SOCIAL & CV
     ============================================================ */
  function renderSocial() {
    const container = document.getElementById('socialIcons');
    if (!container) return;
    container.innerHTML = '';
    CONFIG.social.forEach(function (s) {
      const a = document.createElement('a');
      a.href = s.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'social-icon ' + s.cls;
      a.setAttribute('aria-label', s.name);
      a.setAttribute('title', s.name);
      a.setAttribute('data-name', s.name);
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

  /* ============================================================
     NAV RENDERER
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

  /* ============================================================
     TRANSLATIONS APPLY — bidirectional EN ⇄ AM
     ============================================================ */
  function applyTranslations() {
    document.body.classList.toggle('lang-am', currentLang === 'am');
    document.documentElement.lang = currentLang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (key) el.textContent = t(key);
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-html');
      if (key) el.innerHTML = t(key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) el.placeholder = t(key);
    });

    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-title');
      if (key) el.title = t(key);
    });

    const langLabel = document.getElementById('langLabel');
    if (langLabel) langLabel.textContent = currentLang === 'en' ? 'EN' : 'አማ';

    renderNav();
    renderEducation();
    renderProjects();
    experienceSection.rebuild();
    certificatesSection.rebuild();
    servicesSection.rebuild();
    skillsSection.rebuild();

    startJobRotator();

    document.querySelectorAll('.social-icon').forEach(function (a) {
      const name = a.getAttribute('data-name');
      if (name) { a.setAttribute('aria-label', name); a.setAttribute('title', name); }
    });

    updateActiveNav();
  }

  /* ============================================================
     SCROLL / NAV / THEME / LANG / MOBILE
     ============================================================ */
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
          icon.classList.remove('fa-times'); icon.classList.add('fa-bars');
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
      currentLang = (currentLang === 'en') ? 'am' : 'en';
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

  /* ============================================================
     CONTACT FORM
     ============================================================ */
  function initContactForm() {
    const form      = document.getElementById('contactForm');
    const status    = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const name     = document.getElementById('fromName').value.trim();
      const email    = document.getElementById('fromEmail').value.trim();
      const subjectEl = document.getElementById('subject');
      const subject  = subjectEl ? subjectEl.value.trim() : '';
      const message  = document.getElementById('message').value.trim();
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
          from_name:  name,
          from_email: email,
          reply_to:   email,
          subject:    subject || ('New portfolio message from ' + name),
          message:    message,
          name:       name,
          email:      email,
          user_name:  name,
          user_email: email,
          to_email:   CONFIG.email
        };

        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          { publicKey: EMAILJS_PUBLIC_KEY }
        );

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

  /* ============================================================
     🛡️ SCREENSHOT RESTRICTION — HOME & ABOUT SECTIONS ONLY
     ------------------------------------------------------------
     Protects the media/images inside #home and #about from:
       • Print Screen key
       • Ctrl/Cmd + Shift + S / Ctrl/Cmd + Shift + 3/4/5 (OS screenshot)
       • Right-click → "Save image as…"
       • Drag-to-save
       • Ctrl/Cmd + P / Print
       • Windows Snipping Tool hotkeys
       • Copy (Ctrl/Cmd + C) on focused media
     Note: OS-level screenshots (mobile hardware keys) cannot be
     fully blocked by any web page — this is a best-effort deterrent.
     ============================================================ */
  function initScreenshotProtection() {
    const protectedSections = ['home', 'about'];

    function isInsideProtected(target) {
      if (!target || !target.closest) return false;
      for (let i = 0; i < protectedSections.length; i++) {
        const sec = document.getElementById(protectedSections[i]);
        if (sec && sec.contains(target)) return true;
      }
      return false;
    }

    /* 1) Block Print Screen & known screenshot shortcuts */
    document.addEventListener('keydown', function (e) {
      const key = (e.key || '').toLowerCase();

      /* Print Screen */
      if (key === 'printscreen' || e.code === 'PrintScreen') {
        e.preventDefault();
        e.stopPropagation();
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText('Screenshots are disabled on this page.');
          }
        } catch (err) { /* ignore */ }
        return false;
      }

      /* Ctrl/Cmd + Shift + S  (browser screenshot) */
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && key === 's') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      /* Ctrl/Cmd + Shift + 3 / 4 / 5  (macOS screenshots) */
      if ((e.ctrlKey || e.metaKey) && e.shiftKey &&
          (key === '3' || key === '4' || key === '5')) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      /* Ctrl/Cmd + P — Print */
      if ((e.ctrlKey || e.metaKey) && key === 'p') {
        if (isInsideProtected(document.activeElement)) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }
    }, true);

    /* 2) Block Windows Snipping Tool / Snip & Sketch hotkeys
          (Win + Shift + S is captured by the OS, but we try anyway) */
    document.addEventListener('keyup', function (e) {
      if (e.key === 'PrintScreen' || e.code === 'PrintScreen') {
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText('Screenshots are disabled on this page.');
          }
        } catch (err) { /* ignore */ }
      }
    }, true);

    /* 3) Disable right-click / context menu inside home & about */
    document.addEventListener('contextmenu', function (e) {
      if (isInsideProtected(e.target)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, true);

    /* 4) Disable drag-to-save on all media inside home & about */
    document.addEventListener('dragstart', function (e) {
      if (isInsideProtected(e.target)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, true);

    /* 5) Disable Ctrl/Cmd + C (copy) inside protected sections */
    document.addEventListener('copy', function (e) {
      if (isInsideProtected(e.target) || isInsideProtected(document.activeElement)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, true);

    /* 6) Disable Ctrl/Cmd + S (save page) inside protected sections */
    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && (e.key || '').toLowerCase() === 's') {
        if (isInsideProtected(document.activeElement)) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }
    }, true);

    /* 7) Block "Save image as…" via long-press on mobile */
    document.addEventListener('touchstart', function (e) {
      if (isInsideProtected(e.target) && e.target.tagName === 'IMG') {
        e.target.style.pointerEvents = 'none';
        setTimeout(function () { e.target.style.pointerEvents = ''; }, 300);
      }
    }, { passive: true, capture: true });

    /* 8) Visual deterrent — overlay on home & about media */
    protectedSections.forEach(function (id) {
      const sec = document.getElementById(id);
      if (!sec) return;
      sec.querySelectorAll('.circular-media, .project-media, .cert-preview, .edu-media, .about-layout').forEach(function (m) {
        m.addEventListener('contextmenu', function (e) {
          e.preventDefault();
          e.stopPropagation();
        });
      });
    });
  }

  /* ============================================================
     INIT
     ============================================================ */
  function init() {
    ['../profile images/meleb.jpg',
     '../profile images/mele.jpg',
     '../project images/eep.png'].forEach(function (u) {
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
    renderProjects();
    experienceSection.rebuild();
    certificatesSection.rebuild();
    servicesSection.rebuild();
    skillsSection.rebuild();
    renderSocial();
    renderCVActions();

    applyTranslations();

    document.addEventListener('error', function (e) {
      const el = e.target;
      if (el && (el.tagName === 'IMG' || el.tagName === 'VIDEO')) {
        el.classList.add('media-error');
      }
    }, true);

    initSmoothAnchors();
    initActiveNav();
    initThemeToggle();
    initLangToggle();
    initMobileMenu();
    initProjectsViewMore();
    experienceSection.initViewMore();
    certificatesSection.initViewMore();
    servicesSection.initViewMore();
    skillsSection.initViewMore();
    initContactForm();
    initScreenshotProtection();

    document.dispatchEvent(new Event('portfolio:ready'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();