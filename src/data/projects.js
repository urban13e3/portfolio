import creamyHome from '../assets/creamy-home.webp'
import creamyShop from '../assets/creamy-shop.webp'
import lagosmartContact from '../assets/lagosmart-contact.webp'

export const projects = [
  {
    slug: 'creamy-cakes',
    index: '01',
    name: 'Creamy Cakes',
    kind: 'Full-stack web app',
    year: '2026',
    status: 'Handed over to the LagoSmart dev team',
    summary:
      'An online cake shop with a searchable menu, shopping cart, customer accounts, order tracking and an admin dashboard.',
    stack: ['Laravel', 'PHP', 'Blade', 'Tailwind CSS', 'Alpine.js', 'Vite', 'SQLite'],
    image: creamyHome,
    live: null,
    repo: 'https://github.com/urban13e3/cake-website',
    detail: {
      overview:
        'Creamy Cakes is a small-business storefront I built during my LagoSmart internship. Visitors browse the menu, pick a size and quantity, add cakes to a cart and place an order. Behind the scenes an admin can manage the menu, work through orders and read messages from the contact form.',
      problem:
        'A home cake business was taking orders informally, with no single place to show what was on offer, what was in stock, or what each size cost. The goal was a clean, fast storefront the owner could manage without touching code, simple enough that a customer could order in a few clicks.',
      features: [
        'Menu with live search by name or description',
        'Size and quantity selection, with stock shown per cake',
        'Shopping cart with a live item counter in the header',
        'Customer registration, login and an order history page',
        'Customers can cancel their own orders',
        'Admin dashboard to add, edit and remove cakes',
        'Admin order management and a contact-message inbox',
        'Contact form protected with reCAPTCHA',
      ],
      screens: [
        { src: creamyHome, alt: 'Creamy Cakes home page with hero headline and a three-tier wedding cake', caption: 'Home — a calm, warm hero that leads straight to the menu.' },
        { src: creamyShop, alt: 'Creamy Cakes shop page showing best sellers with search, size and quantity pickers', caption: 'Shop — search, size and quantity on every card, stock visible at a glance.' },
      ],
      tech: [
        ['Laravel', 'Routing, controllers, Eloquent models and migrations (MVC)'],
        ['Blade + Tailwind CSS', 'Server-rendered views and the warm cream-and-brown theme'],
        ['Alpine.js + Vite', 'Light interactivity and asset bundling'],
        ['SQLite', 'Cakes, users, orders, order items and contact messages'],
      ],
      learned: [
        'Structuring a real app with MVC: keeping routes, controllers, models and views each doing one job.',
        'Modelling relational data (orders → order items → cakes) and keeping stock consistent when an order is placed or cancelled.',
        'Protecting routes with authentication and admin-only middleware, and validating every form on the server.',
        'Designing for handover: clear naming and structure so another developer could pick the project up and keep going.',
      ],
    },
  },
  {
    slug: 'lagosmart-website',
    index: '02',
    name: 'LagoSmart Website',
    kind: 'Company website',
    year: '2026',
    status: 'Live',
    summary:
      'Contributions to the main website of LagoSmart, a security-technology company, including the “Get in touch” enquiry flow.',
    stack: ['Laravel', 'PHP', 'JavaScript', 'HTML', 'CSS', 'Git'],
    image: lagosmartContact,
    live: 'https://lagosmart.net',
    repo: null,
    detail: {
      overview:
        'During my internship I worked inside the LagoSmart website codebase, a production Laravel project, contributing pages and interface work as part of the team.',
      problem:
        'Visitors needed an obvious, trustworthy way to reach the company, with enough context (reason for contact, how they found the company) for the team to respond quickly.',
      features: [
        'Modal “Get in touch” enquiry form',
        'Country-aware phone input with flag picker',
        'Reason-for-request and discovery-source dropdowns',
        'Responsive layout across desktop and mobile',
      ],
      screens: [
        { src: lagosmartContact, alt: 'LagoSmart website with the Get in touch enquiry form open in a modal', caption: 'The enquiry modal, open over the home page.' },
      ],
      tech: [
        ['Laravel', 'MVC structure for the company’s site'],
        ['Git & GitHub', 'Branching, commits and merges as part of the team’s SCM workflow'],
        ['HTML, CSS, JavaScript', 'Interface and form behaviour'],
      ],
      learned: [
        'Working inside an existing codebase: reading before writing, and matching the team’s conventions.',
        'Source-control discipline on a shared project: small commits, clear messages, careful merges.',
      ],
    },
  },
  {
    slug: 'task-manager',
    index: '03',
    name: 'Task Manager',
    kind: 'Full-stack web app',
    year: 'In progress',
    status: 'In development',
    summary:
      'A self-directed full-stack task management app, built to go deeper on Java, Spring Boot, PostgreSQL and a React frontend.',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'React', 'REST API'],
    image: null,
    live: null,
    repo: null,
    detail: null,
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)
