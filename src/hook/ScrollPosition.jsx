import { useEffect, useState } from 'react';

export default function ScrollPosition() {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const updatePos = () => {
            setScrollPosition(window.scrollY);
        };
        window.addEventListener("scroll", updatePos);
        updatePos();
        return () => window.removeEventListener("scroll", updatePos);
    }, []);

    return scrollPosition;
}