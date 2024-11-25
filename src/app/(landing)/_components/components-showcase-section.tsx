import ComponentShowcaseCard from "@/components/component-showcase-card";
import FadeUp from "@/components/fadeup";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ButtonExample from "@/showcase/components/button/button";
import CommandExample from "@/showcase/components/command/command";
import DatePickerExample from "@/showcase/components/date-picker/date-picker";
import InputExample from "@/showcase/components/input/input";
import SelectExample from "@/showcase/components/select/select";

const componentShowcases = [
    {
        href: "/docs/components/button",
        title: "Button",
        description: "23 variants",
        component: <ButtonExample />,
    },
    {
        href: "/docs/components/input",
        title: "Input",
        description: "16 variants",
        component: <InputExample />,
    },
    {
        href: "/docs/components/select",
        title: "Select",
        description: "5 variants",
        component: <SelectExample />,
    },
    {
        href: "/docs/components/command",
        title: "Command",
        description: "5 variants",
        component: <CommandExample />,
    },
    {
        href: "/docs/components/date-picker",
        title: "Date piecker",
        description: "5 variants",
        component: <DatePickerExample />,
    },
];

const blockShowcases = [
    {
        href: "/docs/blocks/pricing-card",
        title: "Cards",
        description: "3 variants",
        component: (
            <Card className="w-1/2">
                <div className="space-y-3 p-6">
                    <div className="h-2 w-full rounded bg-gray-300"></div>
                    <div className="h-8 w-full rounded bg-gray-300"></div>
                    <div className="h-4 w-full rounded bg-gray-300"></div>
                </div>
            </Card>
        ),
    },
    {
        href: "/docs/blocks/file-upload",
        title: "File Upload",
        description: "1 variant",
        component: <span>File Upload</span>,
    },
    {
        href: "/docs/blocks/sign-in",
        title: "Sign In",
        description: "1 variant",
        component: <span>Sign In</span>,
    },
];

export default function ShowcaseSection() {
    return (
        <section
            id="components-showcase"
            className="container mx-auto max-w-7xl px-4 py-16"
        >
            <FadeUp duration={0.8} delay={0.1}>
                <h2 className="mb-8 text-center text-3xl font-bold">Components</h2>
            </FadeUp>
            <FadeUp duration={0.8} delay={0.1}>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {componentShowcases.map(({ href, title, description, component }, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <ComponentShowcaseCard
                                    href={href}
                                    title={title}
                                    description={description}
                                    component={component}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </FadeUp>
            <FadeUp duration={0.8} delay={0.1}>
                <h2 className="mb-8 mt-12 text-center text-3xl font-bold">Blocks</h2>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {blockShowcases.map(({ href, title, description, component }, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <ComponentShowcaseCard
                                    href={href}
                                    title={title}
                                    description={description}
                                    component={component}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </FadeUp>
        </section>
    );
}
