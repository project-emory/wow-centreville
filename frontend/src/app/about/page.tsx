"use client";
import Image from "next/image";
import { RedWOWLogo } from "@/public";
import { Button } from "@/src/components";

const About = () => {
    return (
        <div className="mt-[2.5rem] flex min-h-screen w-full justify-center overflow-x-hidden py-[4.75rem]">
            <div className="flex w-[55vw] flex-col items-center justify-center gap-8">
                <Image
                    src={RedWOWLogo}
                    alt="White WOW Logo"
                    className="h-[10rem] w-[10.5rem] object-cover object-left"
                />
                <div className="text-[2.5rem] font-bold text-wow-red">Our Story</div>
                <p className="text-center leading-8">
                    안녕하세요! 센터빌 와우엄마밥상입니다. <br />
                    항상 응원해주시고 사랑을 주셔서 감사합니다.
                    <br />
                    저희는 18년전에 센터빌의 작은 식당에서 패밀리 비지니스를 시작했습니다. 한결같은
                    맛을 중요시하시고, 메뉴 한가지한가지에 진심이신 저희 어머니이자 사장님. 이제는
                    나이가 70이 훌쩍 넘으셨지만, 그 열정만은 20대 못지 않으신분이십니다. 작은
                    식당이었지만 저희가 지금까지 온건 절대 남의 손에 음식을 맡기지 않으셨던 저희
                    어머니 덕분이라 생각합니다. 이제는 식당이 아닌 와우엄마밥상으로 바쁘신
                    어머니들의 손을 돕고자 합니다. 신선하고 좋은 재료로 맛있는 밥상을
                    제공하겠습니다. 와우엄마밥상의 모든 음식은 센터빌 와우정육점에서 조리됩니다.
                    모든 절차를 거쳐 정식으로 퍼밋받아서 조리하는곳임을 알려드립니다.
                    <br />
                    많은 응원 부탁드립니다.😄
                </p>
                <Button className="hover:scale-105" title="View Menu" route="/menu" />
            </div>
        </div>
    );
};

export default About;
