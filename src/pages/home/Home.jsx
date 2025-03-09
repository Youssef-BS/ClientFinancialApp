import React from 'react'
import './home.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate() ;

    const handleClick = () => {
        navigate('/auth/sign-in') ;
    }

  return (
    <div className='all'>
    <div class="background-curve"></div>
    
    <header class="header">
    <div class="logo">
        <img src="https://scontent.fnbe1-2.fna.fbcdn.net/v/t1.15752-9/475830842_2840668172780106_8534456318214879610_n.png?stp=dst-png_s480x480&_nc_cat=107&ccb=1-7&_nc_sid=0024fc&_nc_ohc=FLlKtoQ1ddcQ7kNvgHuSshv&_nc_oc=AdgKnKbAmgHf7j4nBE9_rLw3GTKeqAasSxzj0bTXXvnS0ladoySKjo30EF2rsU1cZAg&_nc_ad=z-m&_nc_cid=1159&_nc_zt=23&_nc_ht=scontent.fnbe1-2.fna&oh=03_Q7cD1gF7I8KjS_BRnXKt_8w3Cgl--awVeb1LpewKaEjwSXBPzQ&oe=67E59542" alt="Logo" height="90" />
    </div>
    <nav>
        <ul>
            <li><a href="#">Products</a></li>
            <li><a href="#">Solutions</a></li>
            <li><a href="#">Accountants</a></li>
            <li><a href="#">Partners</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Support</a></li>
        </ul>
    </nav>
    <div class="right-nav">
        <button class="search-btn"><i class="fas fa-search"></i></button>
        <button class="connect-btn" onClick={handleClick}>Login</button>
    </div>
</header>

    
<div class="hero">
    <h1>For every step of your business</h1>
    <p>M7asbi provides the essential technology and human support</p>
    
    <div class="tabs">
        <button class="tab active">Small Businesses</button>
        <button class="tab">Medium and Large Enterprises</button>
        <button class="tab">Accountants</button>
    </div>
</div>

    
<div class="cards">
    <div class="card">
        <h2>M7asbi 50</h2>
        <p>Accounting, quotes, invoices, inventory, and cash management for small businesses.</p>
        <a href="#" class="card-btn">Discover M7asbi 50</a>
        <div class="card-image">
            <svg width="100%" height="168" viewBox="0 0 413 168">
                <rect x="35" y="0" width="343" height="168" rx="8" fill="white" stroke="#E5E5E5"></rect>
                <text x="50" y="30" fill="#333" font-size="16" font-weight="bold">Expense Breakdown</text>
               
                <circle cx="206.5" cy="100" r="50" fill="none" stroke="#E5E5E5" stroke-width="20"/>                  
                <path d="M206.5 50 A50 50 0 0 1 250 140" stroke="#b6d7a8" stroke-width="20" fill="none"/>
                <path d="M250 140 A50 50 0 0 1 163 140" stroke="#2196F3" stroke-width="20" fill="none"/>
                <path d="M163 140 A50 50 0 0 1 206.5 50" stroke="#FFC107" stroke-width="20" fill="none"/>
                <text x="300" y="80" fill="#666" font-size="12">€15000</text>
                <text x="300" y="110" fill="#666" font-size="12">€07000</text>
                <text x="300" y="140" fill="#666" font-size="12">€06150</text>
            </svg>
        </div>
    </div>
    <div class="card">
        <h2>M7asbi 100 Payroll & HR</h2>
        <p>Payroll and HR management in full compliance for companies with up to 200 employees. Manage your company's human capital flexibly.</p>
        <a href="#" class="card-btn">Discover M7asbi 100 Payroll & HR</a>
        <div class="card-image">
            <svg width="100%" height="168" viewBox="0 0 413 168">
                <rect x="35" y="0" width="343" height="168" rx="8" fill="white" stroke="#E5E5E5"></rect>
                <text x="50" y="30" fill="#333" font-size="16" font-weight="bold">Employee Evolution</text>
                
                <rect x="60" y="60" width="40" height="80" fill="#b6d7a8" opacity="0.8"/>
                <rect x="110" y="80" width="40" height="60" fill="#2196F3" opacity="0.8"/>
                <rect x="160" y="50" width="40" height="90" fill="#FFC107" opacity="0.8"/>
                <rect x="210" y="70" width="40" height="70" fill="#FF5722" opacity="0.8"/>
                
                <line x1="50" y1="140" x2="300" y2="140" stroke="#666" stroke-width="1"/>
               
                <text x="70" y="155" fill="#666" font-size="10">Q1</text>
                <text x="120" y="155" fill="#666" font-size="10">Q2</text>
                <text x="170" y="155" fill="#666" font-size="10">Q3</text>
                <text x="220" y="155" fill="#666" font-size="10">Q4</text>
            </svg>
        </div>
    </div>
</div>

    
<div class="footer">
    <p>Partners: LabelVie, SICAM, Nouvelair, La Mamounia...</p>
</div>

<section class="stats-section">
    <h2 class="stats-title">M7ASBI IN A FEW NUMBERS</h2>
    <h3 class="stats-subtitle">Businesses from around the world trust M7asbi</h3>
    
    <div class="stats-container">
        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-cog"></i>
            </div>
            <h4>Over 40 years</h4>
            <p>of perfecting tools that help businesses like yours succeed</p>
        </div>

        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-users"></i>
            </div>
            <h4>2 million</h4>
            <p>entrepreneurs use M7asbi software in 26 countries</p>
        </div>

        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-headset"></i>
            </div>
            <h4>Over 40,000</h4>
            <p>partners allow us to provide exceptional support</p>
        </div>

        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-trophy"></i>
            </div>
            <h4>Over 100</h4>
            <p>awards received for the quality of our customer service, our software innovations, and much more</p>
        </div>
    </div>
</section>


<section class="services-section">
    <div class="services-container">
        <div class="service-card">
            <div class="service-image">
                <img src="https://placehold.co/120x120/00C853/FFFFFF.svg?text=Books" alt="Stack of books" class="service-icon" />
            </div>
            <h3>Expert Advice</h3>
            <p>Our M7asbi blog provides you with advice on everything related to managing a business, including how to successfully transition leadership within a company.</p>
            <a href="#" class="service-btn">Access the blog</a>
        </div>

        <div class="service-card">
            <div class="service-image">
                <img src="https://placehold.co/120x120/00C853/FFFFFF.svg?text=Partners" alt="Partner illustration" class="service-icon" />
            </div>
            <h3>Partners</h3>
            <p>Our community of partners plays a vital role in providing solutions and services that help our clients worldwide thrive.</p>
            <a href="#" class="service-btn">Discover our partners</a>
        </div>

        <div class="service-card">
            <div class="service-image">
                <img src="https://placehold.co/120x120/00C853/FFFFFF.svg?text=Support" alt="24/7 Support illustration" class="service-icon" />
            </div>
            <h3>24/7 Support</h3>
            <p>Our experts can assist you quickly with online or phone product support available 24 hours a day, 7 days a week.</p>
            <a href="#" class="service-btn">Discover support</a>
        </div>
    </div>
</section>


<section class="blog-section">
    <div class="blog-header">
        <h4 class="blog-subtitle">M7asbi Advice</h4>
        <h2 class="blog-title">The Blog of Keys to Business Management</h2>
    </div>

    <div class="blog-slider">
        <button class="slider-arrow prev">
            <i class="fas fa-arrow-left"></i>
        </button>
        
        <div class="blog-cards">
            <article class="blog-card">
                <div class="blog-image">
                    <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e" alt="Smiling woman in the office" />
                </div>
                <div class="blog-content">
                    <h3>The Right Questions to Ask When Choosing Your Accounting Software</h3>
                    <p>No one can escape administrative tasks. So, if you've just started your business or are in charge of a company...</p>
                </div>
            </article>

            <article class="blog-card">
                <div class="blog-image">
                    <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998" alt="Video conference meeting" />
                </div>
                <div class="blog-content">
                    <h3>The Evolution of Accounting Activity with M7asbi FRP 1000cloud</h3>
                    <p>The International Clinic of Parc Monceau has integrated its purchasing management tool with M7asbi FRP 1000cloud to allow...</p>
                </div>
            </article>

            <article class="blog-card">
                <div class="blog-image">
                    <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf" alt="Team at work" />
                </div>
                <div class="blog-content">
                    <h3>Boosting Accounting Expertise Through Digitalization</h3>
                    <p>Discover how to save time with SaaS solutions. Reduce errors, improve teamwork, and your...</p>
                </div>
            </article>

            <article class="blog-card">
                <div class="blog-image">
                    <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0" alt="Professional discussion" />
                </div>
                <div class="blog-content">
                    <h3>Best Practices for Fast Closing</h3>
                    <p>Closing accounts is a communication argument about the performance and seriousness of companies. They therefore want to...</p>
                </div>
            </article>
        </div>

        <button class="slider-arrow next">
            <i class="fas fa-arrow-right"></i>
        </button>
    </div>

    <div class="slider-dots">
        <span class="dot active"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
    </div>

    <div class="blog-cta">
        <a href="#" class="blog-btn">Access the Blog</a>
    </div>
</section>


<footer class="main-footer">
    <div class="footer-container">
        <div class="footer-logo">
            <img src="https://scontent.fnbe1-2.fna.fbcdn.net/v/t1.15752-9/475830842_2840668172780106_8534456318214879610_n.png?stp=dst-png_s480x480&_nc_cat=107&ccb=1-7&_nc_sid=0024fc&_nc_ohc=FLlKtoQ1ddcQ7kNvgHuSshv&_nc_oc=AdgKnKbAmgHf7j4nBE9_rLw3GTKeqAasSxzj0bTXXvnS0ladoySKjo30EF2rsU1cZAg&_nc_ad=z-m&_nc_cid=1159&_nc_zt=23&_nc_ht=scontent.fnbe1-2.fna&oh=03_Q7cD1gF7I8KjS_BRnXKt_8w3Cgl--awVeb1LpewKaEjwSXBPzQ&oe=67E59542" alt="M7asbi" class="footer-logo-img" />
        </div>

        <div class="footer-content">
            <div class="footer-nav">
                <div class="footer-col">
                    <h3>Segments</h3>
                    <ul>
                        <li><a href="#">Small Businesses (TPE)</a></li>
                        <li><a href="#">Medium and Large Enterprises (SMEs and ETIs)</a></li>
                        <li><a href="#">Certified Accountants</a></li>
                    </ul>
                </div>

                <div class="footer-col">
                    <h3>COMPANY</h3>
                    <ul>
                        <li><a href="#">Overview</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Events</a></li>
                        <li><a href="#">Social Media</a></li>
                        <li><a href="#">About M7asbi</a></li>
                        <li><a href="#">M7asbi Foundation</a></li>
                        <li><a href="#">Investors</a></li>
                        <li><a href="#">News / Press</a></li>
                        <li><a href="#">Sustainability and Society</a></li>
                    </ul>
                </div>

                <div class="footer-col">
                    <h3>PRODUCTS</h3>
                    <ul>
                        <li><a href="#">M7asbi 50</a></li>
                        <li><a href="#">M7asbi 100</a></li>
                        <li><a href="#">M7asbi X3</a></li>
                        <li><a href="#">Expert Connect Generation</a></li>
                        <li><a href="#">View All Products</a></li>
                        <li><a href="#">Login</a></li>
                    </ul>
                </div>

                <div class="footer-col">
                    <h3>SERVICES AND SUPPORT</h3>
                    <ul>
                        <li><a href="#">Support</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Community</a></li>
                        <li><a href="#">Partner Space</a></li>
                        <li><a href="#">Partner Store</a></li>
                    </ul>
                </div>

                <div class="footer-col">
                    <ul>
                        <li><a href="#">Our Partnership Opportunities</a></li>
                        <li><a href="#">ISV Publishers and Alliances</a></li>
                        <li><a href="#">Join Us</a></li>
                        <li><a href="#">Resellers</a></li>
                        <li><a href="#">Integrators</a></li>
                    </ul>
                </div>
            </div>

            <div class="footer-social">
                <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-youtube"></i></a>
            </div>
        </div>
    </div>
</footer>

</div>
  )
}

export default Home