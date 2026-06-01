import {Slider} from "@base-ui-components/react/slider";
import styles from './index.module.css';
import clsx from "clsx";
export function KarmaSlider() {
    return (
        <Slider.Root defaultValue={25} orientation={"vertical"}>
            <Slider.Control className={styles.Control}>
                <Slider.Track className={clsx(styles.Track)}>
                    <Slider.Indicator className={styles.Indicator}/>
                    <Slider.Thumb aria-label="Volume" className={styles.Thumb}/>
                </Slider.Track>
            </Slider.Control>
        </Slider.Root>
    );
}