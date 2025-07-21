import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Upload, Download, RefreshCw, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Base64Tool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const { toast } = useToast();

  const encodeToBase64 = () => {
    try {
      if (!input.trim()) {
        setError("Please enter some text to encode");
        setOutput("");
        return;
      }

      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
      setError("");
      
      toast({
        title: "Encoded!",
        description: "Text encoded to Base64 successfully",
        duration: 2000,
      });
    } catch (err) {
      setError("Failed to encode text. Please check your input.");
      setOutput("");
      
      toast({
        title: "Encoding Error",
        description: "Failed to encode the text",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const decodeFromBase64 = () => {
    try {
      if (!input.trim()) {
        setError("Please enter Base64 text to decode");
        setOutput("");
        return;
      }

      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
      setError("");
      
      toast({
        title: "Decoded!",
        description: "Base64 decoded successfully",
        duration: 2000,
      });
    } catch (err) {
      setError("Invalid Base64 format. Please check your input.");
      setOutput("");
      
      toast({
        title: "Decoding Error",
        description: "Invalid Base64 format",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const copyToClipboard = async () => {
    if (!output) {
      toast({
        title: "Nothing to copy",
        description: `Please ${mode} some text first`,
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      toast({
        title: "Copied!",
        description: "Result copied to clipboard",
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

  const swapInputOutput = () => {
    const temp = input;
    setInput(output);
    setOutput(temp);
    setMode(mode === "encode" ? "decode" : "encode");
    setError("");
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const handleProcess = () => {
    if (mode === "encode") {
      encodeToBase64();
    } else {
      decodeFromBase64();
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Upload className="w-5 h-5 text-primary" />
              {mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder={
                mode === "encode"
                  ? "Enter your text here...\n\nExample:\nHello World!"
                  : "Enter Base64 string here...\n\nExample:\nSGVsbG8gV29ybGQh"
              }
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
              <Download className="w-5 h-5 text-success" />
              {mode === "encode" ? "Base64 Result" : "Decoded Text"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder={
                mode === "encode"
                  ? "Base64 encoded text will appear here..."
                  : "Decoded text will appear here..."
              }
              value={output}
              readOnly
              className="min-h-[200px] font-mono text-sm bg-muted border-border"
            />
            
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
              
              <Button
                onClick={swapInputOutput}
                variant="outline"
                size="sm"
                disabled={!output}
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Swap
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mode Toggle & Controls */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4">
            {/* Mode Toggle */}
            <div className="flex gap-2 p-1 bg-muted rounded-lg">
              <Button
                onClick={() => setMode("encode")}
                variant={mode === "encode" ? "default" : "ghost"}
                size="sm"
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Encode
              </Button>
              <Button
                onClick={() => setMode("decode")}
                variant={mode === "decode" ? "default" : "ghost"}
                size="sm"
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Decode
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                onClick={handleProcess}
                variant="gradient"
                className="flex items-center gap-2"
              >
                {mode === "encode" ? (
                  <>
                    <Upload className="w-4 h-4" />
                    Encode to Base64
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Decode from Base64
                  </>
                )}
              </Button>
              
              <Button
                onClick={clearAll}
                variant="outline"
              >
                Clear All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};