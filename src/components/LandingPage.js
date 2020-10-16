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
            <p className="text-justify text-md text-white leading-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto est officia delectus nobis aspernatur! Iusto eveniet consequatur nisi distinctio asperiores mollitia ad sunt praesentium corporis quaerat, facilis perspiciatis. Iusto, minima.
            </p>
        </div>
        <div className="m-auto mb-5 px-6 py-5 description-info">
            <h2>
                What is Spaced Repition System?
            </h2>
            <p className="text-justify text-md text-white leading-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto est officia delectus nobis aspernatur! Iusto eveniet consequatur nisi distinctio asperiores mollitia ad sunt praesentium corporis quaerat, facilis perspiciatis. Iusto, minima.</p>
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