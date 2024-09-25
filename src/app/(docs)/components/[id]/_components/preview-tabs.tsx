import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type Props = {
  component: React.ReactNode;
  settingsEngine?: React.ReactNode;
  data?: {
    title: string;
    description: string;
    code: string;
    componentCode: string;
  };
};

export default function PreviewTabs({
  component,
  settingsEngine,
  data,
}: Props) {
  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full">
          <TabsContent
            value="preview"
            className="bg-gradient dark:bg-gradient-dark h-[250px] w-full content-center rounded-b-lg rounded-tr-lg bg-repeat "
          >
            <div className="flex justify-center">
              <Button variant="default">Button</Button>
            </div>
          </TabsContent>
        </div>
      </div>
      <TabsContent value="code" className="rounded-lg ">
        <div className="relative mx-auto max-w-6xl">
          Code
        </div>
      </TabsContent>
    </Tabs>
  );
}
