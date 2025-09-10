import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Smartphone, CheckCircle, AlertCircle, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ConnectionStatusProps {
  isConnected: boolean;
  onConnect: () => void;
}

export function ConnectionStatus({ isConnected, onConnect }: ConnectionStatusProps) {
  const [authCode, setAuthCode] = useState("");
  const [userCode, setUserCode] = useState("");
  const [verificationUrl, setVerificationUrl] = useState("");
  const [step, setStep] = useState<"initial" | "waiting" | "code-entry">("initial");
  const { toast } = useToast();

  const generateUserCode = () => {
    // Simular geração do userCode
    const mockUserCode = "PBSUP-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const mockVerificationUrl = `https://partner-portal.ifood.com.br/auth/device?code=${mockUserCode}`;
    
    setUserCode(mockUserCode);
    setVerificationUrl(mockVerificationUrl);
    setStep("waiting");
    
    toast({
      title: "Código gerado!",
      description: "Acesse o Portal do Parceiro iFood para autorizar o aplicativo.",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Código copiado para a área de transferência.",
    });
  };

  const handleAuthSubmit = () => {
    if (authCode.trim()) {
      // Simular troca do código por token
      onConnect();
      toast({
        title: "Conectado com sucesso!",
        description: "Sua loja está agora integrada ao iFood.",
      });
    }
  };

  if (isConnected) {
    return (
      <Card className="bg-gradient-success border-success/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-success-foreground">
            <CheckCircle className="text-success" size={24} />
            Conectado ao iFood
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-success-foreground">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="opacity-90">Status:</p>
                <Badge className="bg-success/20 text-success border-success/30">
                  Ativo
                </Badge>
              </div>
              <div>
                <p className="opacity-90">Última sincronização:</p>
                <p className="font-medium">Há 2 minutos</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-success/30 text-success hover:bg-success/10">
              Gerenciar Conexão
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone size={24} />
          Integração iFood
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === "initial" && (
          <div className="space-y-4">
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-warning mt-0.5" size={20} />
                <div className="space-y-2">
                  <p className="text-sm font-medium">Não conectado</p>
                  <p className="text-xs text-muted-foreground">
                    Para receber pedidos do iFood, você precisa autorizar a integração.
                  </p>
                </div>
              </div>
            </div>
            
            <Button onClick={generateUserCode} className="w-full">
              Conectar ao iFood
            </Button>
          </div>
        )}

        {step === "waiting" && (
          <div className="space-y-4">
            <div className="text-center space-y-3">
              <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Passo 1: Autorize no Portal</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Acesse o Portal do Parceiro iFood e use o código abaixo:
                </p>
                
                <div className="bg-background/50 rounded-lg p-3 border">
                  <div className="flex items-center justify-between">
                    <code className="text-lg font-mono font-bold">{userCode}</code>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard(userCode)}
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3"
                  onClick={() => window.open(verificationUrl, '_blank')}
                >
                  <ExternalLink size={16} className="mr-2" />
                  Abrir Portal do Parceiro
                </Button>
              </div>
            </div>
            
            <Button 
              onClick={() => setStep("code-entry")} 
              variant="secondary" 
              className="w-full"
            >
              Já autorizei - Inserir código
            </Button>
          </div>
        )}

        {step === "code-entry" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="authCode">Código de Autorização</Label>
              <Input
                id="authCode"
                placeholder="Cole aqui o código recebido do Portal"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Copie o código que apareceu no Portal do Parceiro após a autorização.
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleAuthSubmit} 
                disabled={!authCode.trim()}
                className="flex-1"
              >
                Conectar
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setStep("waiting")}
              >
                Voltar
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}