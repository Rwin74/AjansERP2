import { useSettingsStore } from '../store/useSettingsStore';

export class GeminiService {
  static async analyzeClientData(clientData: any): Promise<any> {
    const { gemini } = useSettingsStore.getState();
    
    if (!gemini.isConnected || !gemini.apiKey) {
      console.warn("Gemini is not connected. Returning mock analysis.");
      // Fallback to mock behavior if no API key
      return {
        recommendations: [],
        tasks: []
      };
    }

    try {
      console.log(`[Gemini API] Requesting analysis using model: ${gemini.model}`);
      
      const prompt = `Sen bir SEO ve Dijital Pazarlama uzmanısın. Müşteri verilerini analiz edip özet çıkarman ve yapılması gereken görevleri (tasks) belirlemen gerekiyor. 
Gelen veri: ${JSON.stringify(clientData)}

Lütfen aşağıdaki JSON formatında ve SADECE JSON olarak cevap ver, markdown veya başka metin kullanma:
{
  "success": true,
  "summary": "Mevcut durumun kısa bir özeti ve analiz sonucu.",
  "tasks": [
    { "t": "Görev adı (Kısa ve net)", "p": "Yüksek", "time": "Tahmini süre (örn: 15 dk)", "impact": "Kritik|Trafik|Sıralama vb.", "color": "red|blue|green|purple|yellow" }
  ]
}
Görev öncelikleri (p) Yüksek, Orta veya Düşük olabilir.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${gemini.model}:generateContent?key=${gemini.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API Hatası: ${response.statusText}`);
      }

      const data = await response.json();
      const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!textResponse) {
        throw new Error("API'den geçersiz yanıt geldi.");
      }

      // Gemini bazen markdown içinde JSON döndürebiliyor ```json ... ``` şeklinde. Onu temizleyelim.
      let cleanJsonString = textResponse.trim();
      if (cleanJsonString.startsWith('```json')) {
        cleanJsonString = cleanJsonString.replace(/^```json/, '').replace(/```$/, '').trim();
      } else if (cleanJsonString.startsWith('```')) {
        cleanJsonString = cleanJsonString.replace(/^```/, '').replace(/```$/, '').trim();
      }

      const result = JSON.parse(cleanJsonString);
      return result;

    } catch (error) {
      console.error("Gemini API Error:", error);
      // Hata durumunda boş dönelim ki uygulama çökmesin
      return {
        success: false,
        summary: "Analiz sırasında bir hata oluştu veya API bağlantısı sağlanamadı.",
        tasks: []
      };
    }
  }

  static async generateBlogDraft(topic: string): Promise<string> {
    // Placeholder
    return `# ${topic}\n\nBu bir AI tarafından oluşturulmuş taslaktır.`;
  }

  static async askAssistant(message: string, contextData?: any): Promise<string> {
    const { gemini } = useSettingsStore.getState();
    
    if (!gemini.isConnected || !gemini.apiKey) {
      return "Gemini API bağlantısı kurulamadı. Lütfen Ayarlar'dan API anahtarınızı kontrol edin.";
    }

    try {
      let promptText = `Sen AjansOS sisteminin akıllı SEO ve Dijital Pazarlama asistanısın. Kullanıcıya profesyonel, net ve yardımcı bir dille cevap ver.\n\n`;
      
      if (contextData) {
        promptText += `Şu anki bağlam/müşteri verisi:\n${JSON.stringify(contextData)}\n\n`;
      }
      
      promptText += `Kullanıcının sorusu/mesajı: ${message}`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${gemini.model}:generateContent?key=${gemini.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: promptText }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API Hatası: ${response.statusText}`);
      }

      const data = await response.json();
      const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      return textResponse || "Üzgünüm, şu an yanıt veremiyorum.";

    } catch (error) {
      console.error("Gemini API Chat Error:", error);
      return "Bir hata oluştu. Lütfen tekrar deneyin.";
    }
  }

  static async analyzeCompetitors(clientSite: string, competitors: string[]): Promise<any> {
    const { gemini } = useSettingsStore.getState();
    
    if (!gemini.isConnected || !gemini.apiKey) {
      return {
        success: false,
        summary: "Gemini API bağlantısı kurulamadı.",
        gaps: [],
        recommendations: []
      };
    }

    try {
      const promptText = `Sen uzman bir SEO analistisin. Müşterimizin sitesi: ${clientSite} ve rakipleri: ${competitors.join(', ')}.
Lütfen bu siteleri kıyaslayarak (gerçek veriye ulaşamasan da tahmini ve jenerik ama mantıklı bir) rakip analizi yap.
Sonucu SADECE aşağıdaki JSON formatında ver, markdown kullanma:
{
  "success": true,
  "summary": "Genel kıyaslama özeti (1-2 cümle)",
  "scores": [
    { "site": "Site adı", "score": 85 }
  ],
  "gaps": [
    { "title": "Fırsat Başlığı", "description": "Fırsat açıklaması", "impact": "Yüksek" }
  ],
  "recommendations": [
    "Öneri 1",
    "Öneri 2"
  ]
}`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${gemini.model}:generateContent?key=${gemini.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: promptText }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API Hatası: ${response.statusText}`);
      }

      const data = await response.json();
      const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      let cleanJsonString = textResponse?.trim() || "";
      if (cleanJsonString.startsWith('```json')) {
        cleanJsonString = cleanJsonString.replace(/^```json/, '').replace(/```$/, '').trim();
      } else if (cleanJsonString.startsWith('```')) {
        cleanJsonString = cleanJsonString.replace(/^```/, '').replace(/```$/, '').trim();
      }

      return JSON.parse(cleanJsonString);

    } catch (error) {
      console.error("Gemini API Error:", error);
      return {
        success: false,
        summary: "Analiz sırasında bir hata oluştu.",
        scores: [],
        gaps: [],
        recommendations: []
      };
    }
  }
}
