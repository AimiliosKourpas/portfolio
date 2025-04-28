"use client";
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const circlesContainer = document.querySelector('.circles');

    const numberOfCubes = 8;
    for (let i = 0; i < numberOfCubes; i++) {
      const li = document.createElement('li');
      li.style.width = `${20 + Math.random() * 80}px`; 
      li.style.height = li.style.width;
      li.style.left = `${Math.random() * 100}%`;
      li.style.top = `${Math.random() * 100}%`;
      li.setAttribute('data-direction-x', (Math.random() < 0.5 ? -1 : 1).toString());
      li.setAttribute('data-direction-y', (Math.random() < 0.5 ? -1 : 1).toString());
      li.setAttribute('data-speed', '0.1');
      circlesContainer.appendChild(li);
    }

    const circles = document.querySelectorAll<HTMLLIElement>('.circles li');
    let lastTimestamp = 0;
    let lastScrollY = 0;
    let currentSpeedFactor = 0.1;
    let scrollSpeed = 0;
    let scrollTimeout: NodeJS.Timeout;

    const smoothScroll = () => {
      const smoothTransition = (currentSpeed: number, targetSpeed: number, easing: number) => {
        return currentSpeed + (targetSpeed - currentSpeed) * easing;
      };

      const transitionSpeed = 0.1;
      currentSpeedFactor = smoothTransition(currentSpeedFactor, 0.1, transitionSpeed);

      circles.forEach((cube) => {
        const directionX = parseFloat(cube.getAttribute('data-direction-x') || '1');
        const directionY = parseFloat(cube.getAttribute('data-direction-y') || '1');
        const baseSpeed = parseFloat(cube.getAttribute('data-speed') || '0.1');
        const speed = baseSpeed * currentSpeedFactor;

        const currentLeft = parseFloat(cube.style.left || '0');
        const currentTop = parseFloat(cube.style.top || '0');

        let newLeft = currentLeft + directionX * speed * 10;
        let newTop = currentTop + directionY * speed * 10;

        if (newLeft <= 0 || newLeft >= 100) {
          cube.setAttribute('data-direction-x', (-directionX).toString());
          newLeft = Math.max(0, Math.min(100, newLeft));
        }

        if (newTop <= 0 || newTop >= 100) {
          cube.setAttribute('data-direction-y', (-directionY).toString());
          newTop = Math.max(0, Math.min(100, newTop));
        }

        cube.style.left = `${newLeft}%`;
        cube.style.top = `${newTop}%`;
      });
    };

    const animateCircles = (timestamp: number) => {
      lastTimestamp = timestamp;

      smoothScroll();

      requestAnimationFrame(animateCircles);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      scrollSpeed = Math.abs(scrollDelta);
      currentSpeedFactor = Math.max(0.1, scrollSpeed / 100);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {}, 500);
    };

    window.addEventListener('scroll', handleScroll);
    requestAnimationFrame(animateCircles);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);
  
  return (
    <div>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white p-4 z-10 shadow-lg 
  hidden md:flex items-center justify-center gap-x-6">
  {/* Logo / Profile Picture */}
  <div className="photo-circle w-16 h-16 rounded-full overflow-hidden border-2 border-yellow-500 mr-6">
    <img src="/images/aimilios.jpeg" alt="Your Name" className="w-full h-full object-cover" />
  </div>

  {/* Navigation Links */}
  <ul className="flex space-x-6 text-lg font-medium justify-center">
    <li>
      <a href="#home" className="hover:text-yellow-500 transition duration-300">Home</a>
    </li>
    <li>
      <a href="#about" className="hover:text-yellow-500 transition duration-300">About</a>
    </li>
    <li>
      <a href="#education" className="hover:text-yellow-500 transition duration-300">Education</a>
    </li>
    <li>
      <a href="#projects" className="hover:text-yellow-500 transition duration-300">Projects</a>
    </li>
    <li>
      <a href="#questions" className="hover:text-yellow-500 transition duration-300">Questions</a>
    </li>
  </ul>
</nav>

      {/* Main Content */}
      <div className="scroll-content">
        {/* Section: Home */}
        <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center">
          {/* Mobile: Photo on top */}
          <div className="photo-circle w-32 h-32 rounded-full overflow-hidden mb-4 md:hidden">
            <img src="/images/aimilios.jpeg" alt="Your Name" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Welcome to My Portfolio</h1>
            <p className="mt-4 text-lg text-white">Scroll Down to See the Effect and Explore</p>
          </div>
        </section>

        {/* Section: About */}
        <section id="about" className="min-h-screen flex items-center justify-center text-center">
          <div>
            <h2 className="text-3xl font-bold text-white">About Me</h2>
            <p className="mt-4 text-lg text-white">
              I am a passionate software developer with expertise in front-end and back-end development. I love building interactive web applications and exploring new technologies.
            </p>
          </div>
        </section>
        
        {/* Section: Education */}
        <section id="education" className="min-h-screen flex items-center justify-center text-center">
          <div>
            <h2 className="text-3xl font-bold text-white">Education</h2>
            <ul className="mt-4 text-lg list-none text-white">
              <li>Bachelor of Science in Computer Science - XYZ University</li>
              <li>Certification in Full Stack Web Development - ABC Institute</li>
              <li>Ongoing: Master's Degree in Software Engineering</li>
            </ul>
          </div>
        </section>

        {/* Section: Projects */}
        <section id="projects" className="min-h-screen flex items-center justify-center text-center">
          <div>
            <h2 className="text-3xl font-bold text-white">Projects</h2>
            <ul className="mt-4 text-lg list-none text-white">
              <li>Portfolio Website - A fully responsive personal website.</li>
              <li>E-commerce Platform - Built with React and Node.js.</li>
              <li>Weather App - Uses APIs to display real-time weather updates.</li>
            </ul>
          </div>
        </section>

        {/* Section: Questions */}
        <section id="questions" className="min-h-screen flex items-center justify-center text-center">
          <div>
            <h2 className="text-3xl font-bold text-white">Questions?</h2>
            <p className="mt-4 text-lg text-white">Feel free to reach out if you have any questions or want to collaborate!</p>
            <p className="text-white">Email: myemail@example.com</p>
          </div>
        </section>
      </div>

      {/* Background Circle Animation */}
      <div className="area">
        <ul className="circles"></ul>
      </div>
    </div>
  );
}
