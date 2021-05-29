import React from "react";
import Header from "./Header";

const LandingPage = () => {
    return(
        <div>
        <Header />
        <header className="header">
            <div className="header__text">
            <h1>
              2,000 kanji.<br></br>
              6,000 vocabulary words.<br></br>
              In just over a year.
            </h1>
            </div>
        </header>
        <section className="py-20 px-10 bg-tertiary -mt-16 grid row-gap-6 md:grid-cols-2 md:col-gap-8">
            <div className="description">
            <div className="m-auto mb-5 px-6 py-5 description-info">
            <h2>
                Learn with Mnemnonics
            </h2>
            <p className="text-justify text-xl text-white leading-6">
            Each and every Radical, Kanji and Vocabulary comes with Mnemnonics. These menemonics help you to remember
            both the meaning and visualization of the particualr symbol. Learning with mnemonics is a proven method to allow for
            fast memorization and a long term recall. So what are you waiting for? Go ahead and dive straight in the world of awesome
            menemonics helping you in your learning journey.
            </p>
        </div>
        <div className="m-auto mb-5 px-6 py-5 description-info">
            <h2>
                What is Spaced Repition System?
            </h2>
            <p className="text-justify text-xl text-white leading-6">
            Spaced Repetion System is a method where all the Radicals, Kanji and Vocabulary that you have learned are presented
            to you after repeating intervals so that they fit in your long term meomory and you dont forget them easily. We use an
            algorithm which on the basis of the number of correct and incorrect answers made decides the best possible time to show
            you a piece of learning again. This helps you to retain even hardest of stuff over a period of time.
            </p>
        </div>
    </div>
    <div className="composition-wrapper">
        <div className="composition">
            <img src="imgs/img1.png" alt="Photo 1" class="composition__photo composition__photo--p1"></img>
            <img src="imgs/img2.png" alt="Photo 2" class="composition__photo composition__photo--p2"></img>
            <img src="imgs/img3.png" alt="Photo 3" class="composition__photo composition__photo--p3"></img>
        </div>
    </div>
    </section>
    <footer className="py-4 bg-black">
        <span className="m-auto text-white text-xl">Copyright KanjiBlaze 2020</span>
    </footer>
</div>
    )
}

export default LandingPage;