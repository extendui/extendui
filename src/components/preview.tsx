import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Code, Eye } from "lucide-react";

type Props = {
    component: React.ReactNode;
    settingsEngine: React.ReactNode;
}

export default function Preview({ component, settingsEngine }: Props) {
    return (
        <Tabs defaultValue="preview">
            <TabsList className={cn('flex items-center justify-end bg-inherit')}>
                <TabsTrigger
                    value="preview"
                    className={cn(
                        'data-[state=active]:bg-zinc-900 data-[state=active]:text-white data-[state=active]:shadow',
                    )}
                >
                    <Eye size={16} />
                    <span className="ml-1">Preview</span>
                </TabsTrigger>
                <TabsTrigger
                    value="code"
                    className={cn(
                        'data-[state=active]:bg-zinc-900 data-[state=active]:text-white data-[state=active]:shadow',
                    )}
                >
                    <Code size={16} />
                    <span className="ml-1">Code</span>
                </TabsTrigger>
            </TabsList>
            <div className="flex flex-col lg:flex-row">
                <div className="w-full">
                    <TabsContent
                        value="preview"
                        className="bg-gradient dark:bg-gradient-dark h-[250px] w-full content-center rounded-lg bg-repeat shadow-[inset_0_0_2px_rgba(0,0,0,0.1)] shadow-slate-300"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center justify-center">
                                {component}
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                {settingsEngine}
                            </div>
                        </div>

                    </TabsContent>
                </div>
            </div>
            <TabsContent value="code" className="rounded-lg">
                <div className="relative mx-auto max-w-6xl">Code</div>
            </TabsContent>
        </Tabs>
    );
}