import { motion } from "framer-motion";

function RevealText({ text }) {

    const letters = text.split("");

    return (

        <h1 className="hero-title">

            {letters.map((letter, index) => (

                <motion.span
                    key={index}
                    initial={{
                        opacity: 0,
                        filter: "blur(12px)",
                        y: 20,
                    }}
                    whileInView={{
                        opacity: 1,
                        filter: "blur(0px)",
                        y: 0,
                    }}

                    viewport={{
                        once: true,
                        amount: 0.4,
                    }}
                    transition={{
                        duration: 0.25,
                        delay: index * 0.04,
                    }}
                >
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>

            ))}

        </h1>

    );
}

export default RevealText;