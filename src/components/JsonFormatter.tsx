import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, CheckCircle, AlertCircle, Sparkles, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ReactJson from "react-json-view";
import { useTheme } from "@/contexts/ThemeContext";

export const JsonFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [parsedJson, setParsedJson] = useState<any>(null);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const { darkMode } = useTheme();

  const formatJson = () => {
    try {
      if (!input.trim()) {
        setError("Please enter some JSON to format");
        setOutput("");
        return;
      }

      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setParsedJson(parsed);
      setError("");
      
      toast({
        title: "Success!",
        description: "JSON formatted successfully",
        duration: 2000,
      });
    } catch (err) {
      setError("Invalid JSON format. Please check your input.");
      setOutput("");
      setParsedJson(null);
      
      toast({
        title: "Error",
        description: "Invalid JSON format",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const minifyJson = () => {
    try {
      if (!input.trim()) {
        setError("Please enter some JSON to minify");
        setOutput("");
        return;
      }

      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setParsedJson(null); // Hide tree view for minified JSON
      setError("");
      
      toast({
        title: "Success!",
        description: "JSON minified successfully",
        duration: 2000,
      });
    } catch (err) {
      setError("Invalid JSON format. Please check your input.");
      setOutput("");
      setParsedJson(null);
      
      toast({
        title: "Error",
        description: "Invalid JSON format",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const copyToClipboard = async () => {
    if (!output) {
      toast({
        title: "Nothing to copy",
        description: "Please format some JSON first",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "JSON copied to clipboard",
        duration: 2000,
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setParsedJson(null);
    setError("");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Code className="w-5 h-5 text-primary" />
              Input JSON
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder='Enter your JSON here...\n\nExample:\n{"name": "John", "age": 30}'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[200px] font-mono text-sm bg-input border-border"
            />
            
            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <CheckCircle className="w-5 h-5 text-success" />
              Formatted JSON
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {parsedJson ? (
              <div className="border border-border rounded-lg p-4 bg-muted min-h-[200px] overflow-auto">
                <ReactJson
                  src={parsedJson}
                  theme={darkMode ? "monokai" : "rjv-default"}
                  displayDataTypes={false}
                  displayObjectSize={false}
                  enableClipboard={false}
                  collapsed={false}
                  name={false}
                  style={{
                    backgroundColor: "transparent",
                    fontSize: "14px"
                  }}
                />
              </div>
            ) : (
              <Textarea
                placeholder="Formatted JSON will appear here..."
                value={output}
                readOnly
                className="min-h-[200px] font-mono text-sm bg-muted border-border"
              />
            )}
            
            <div className="flex gap-2">
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
                disabled={!output}
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              onClick={formatJson}
              variant="gradient"
              className="flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Format & Beautify
            </Button>
            
            <Button
              onClick={minifyJson}
              variant="default"
              className="flex items-center gap-2"
            >
              <Code className="w-4 h-4" />
              Minify
            </Button>
            
            <Button
              onClick={clearAll}
              variant="outline"
            >
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};