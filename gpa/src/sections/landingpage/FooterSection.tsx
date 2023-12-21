import { GpaGold } from "@/icons";
import { Container, Group, Anchor } from "@mantine/core";
import classes from "@/modules/Footer.module.css";
import { GetInTouchSimple } from "@/components/custom/GetInTouch";

const links = [
  { link: "#", label: "Vision" },
  { link: "#", label: "Features" },
  { link: "#", label: "SPU" },
  { link: "/login", label: "Login" },
];

export default function FooterSection() {
  const items = links.map((link) => (
    <Anchor<"a"> c="dimmed" key={link.label} href={link.link} size="sm">
      {link.label}
    </Anchor>
  ));

  return (
    <div className="flex flex-col justify-center max-w-100 mx-auto mt-20 border-t-2 pt-12 border-t-gold-light">
      <div className="flex justify-around md:flex-col ">
        <div className="font-semibold text-3xl self-center">
          <div className="text-center mb-4 text-black-base font-black">
            Get In Touch
          </div>
          <div className="text-xl max-w-xs text-center text-gold-light md:mb-4 md:text-lg md:px-2">
            Any Suggestions, Questions, or Improvements? Let us know, we are
            here for you.
          </div>
        </div>
        <div className="max-w-xl mb-0 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] p-6 self-center md:w-96 sm:w-72 rounded-b-sm">
          <GetInTouchSimple />
        </div>
      </div>
      <div className={classes.footer} style={{ marginTop: "1rem" }}>
        <Container className={classes.inner}>
          <GpaGold />
          <Group className="sm:grid sm:grid-cols-2">{items}</Group>
        </Container>
      </div>
    </div>
  );
}
