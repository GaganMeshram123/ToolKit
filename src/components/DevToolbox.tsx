import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";
import { JsonFormatter } from "./JsonFormatter";
import { Base64Tool } from "./Base64Tool";
import { Code, FileText, Sun, Moon } from "lucide-react";

export const DevToolbox = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <h1 className="text-4xl font-bold text-foreground">
              Dev Toolbox
            </h1>
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-muted-foreground" />
              <Switch
                checked={darkMode}
                onCheckedChange={toggleDarkMode}
                aria-label="Toggle dark mode"
              />
              <Moon className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          <p className="text-muted-foreground text-lg">
            Essential development tools at your fingertips
          </p>
        </div>

        {/* Main Toolbox */}
        <Card className="bg-gradient-to-br from-card to-secondary/20 border-border shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-foreground">
              Developer Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="json" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted">
                <TabsTrigger value="json" className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  JSON Formatter
                </TabsTrigger>
                <TabsTrigger value="base64" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Base64 Tool
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="json">
                <JsonFormatter />
              </TabsContent>
              
              <TabsContent value="base64">
                <Base64Tool />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};