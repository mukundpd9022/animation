"use client";
import { useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ReactLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const scrollTriggerSettings = {
      trigger: ".main",
      start: "top 25%",
      toggleActions: "play reverse play reverse",
    };

    const leftXValues = [-800, -900, -400, -500];
    const rightXValues = [800, 900, 400, 500];
    const leftRotationValues = [-30, -20, -35, -25];
    const rightRotationValues = [30, 20, 35, 25];
    const yValues = [100, -150, -400, -200];

    gsap.utils.toArray(".row").forEach((row, index) => {
      if (!(row instanceof HTMLElement)) return;

      const cardLeft = row.querySelector(".card-left");
      const cardRight = row.querySelector(".card-right");

      if (!cardLeft || !cardRight) return;

      gsap.to([cardLeft, cardRight], {
        x: (i) => (i === 0 ? leftXValues[index] : rightXValues[index]),
        y: yValues[index],
        rotation: (i) => (i === 0 ? leftRotationValues[index] : rightRotationValues[index]),
        scrollTrigger: {
          trigger: ".main",
          start: "top center",
          end: "150% bottom",
          scrub: true,
        },
      });
    });

    gsap.to(".logo", {
      scale: 1,
      duration: 1,
      ease: "power1.out",
      scrollTrigger: scrollTriggerSettings,
    });

    gsap.to(".line p", {
      y: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: scrollTriggerSettings,
    });

    gsap.to(".button", {
      y: 0,
      opacity: 1,
      delay: 0.25,
      duration: 0.5,
      ease: "power1.out",
      scrollTrigger: scrollTriggerSettings,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const generateRows = () => {
    const rows = [];
    for (let i = 1; i <= 3; i++) {
      rows.push(
        <div className="row" key={i}>
          <div className="card card-left">
            <img src={`/images/img-${2 * i - 1}.jpg`} alt="" />
          </div>
          <div className="card card-right">
            <img src={`/images/img-${2 * i}.jpg`} alt="" />
          </div>
        </div>
      );
    }
    return rows;
  };

  return (
    <>
      <ReactLenis root>
        <section className="hero">
          <div className="img">
            <img src="/images/Logo.png" alt="Hero Image" />
          </div>
        </section>

        <section className="main">
          <div className="main-content">
            <div className="logo">
              <img src="/images/img-1.jpg" alt="Logo" />
            </div>
            <div className="copy">
              <div className="line">
                <p>Delve into coding without clutter.</p>
              </div>
              <div className="line">
                <p>One subscription. Endless web design.</p>
              </div>
              <div className="line">
                <p>Take the fast lane to mastery.</p>
              </div>
            </div>
            <div className="btn">
              <button className="button">Get PRO</button>
            </div>
          </div>
          {generateRows()}
        </section>

        <section className="footer">
          <Link href="https://mukundpant.com.np/">Link in description</Link>
        </section>
      </ReactLenis>
    </>
  );
}