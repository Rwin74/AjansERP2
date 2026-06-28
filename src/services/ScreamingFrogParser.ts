export class ScreamingFrogParser {
  /**
   * Parses an Issues Overview CSV export from Screaming Frog.
   */
  static async parseCSV(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          let text = e.target?.result as string;
          if (!text) throw new Error("Dosya boş");

          // Remove BOM if present
          if (text.charCodeAt(0) === 0xFEFF) {
            text = text.substring(1);
          }

          const lines = text.split(/\r?\n/);
          if (lines.length < 2) throw new Error("Geçersiz veya boş CSV dosyası");

          // Basic CSV row parser handling quotes
          const parseRow = (row: string) => {
            const result = [];
            let inQuotes = false;
            let current = '';
            for (let i = 0; i < row.length; i++) {
              const char = row[i];
              if (char === '"') {
                inQuotes = !inQuotes;
              } else if (char === ',' && !inQuotes) {
                result.push(current);
                current = '';
              } else {
                current += char;
              }
            }
            result.push(current);
            return result;
          };

          const headers = parseRow(lines[0]).map(h => h.trim().replace(/^[\uFEFF"']+|["']+$/g, ''));
          const issueNameIdx = headers.indexOf('Issue Name');
          const urlsIdx = headers.indexOf('URLs');
          const descIdx = headers.indexOf('Description');
          const fixIdx = headers.indexOf('How To Fix');
          const typeIdx = headers.indexOf('Issue Type');

          if (issueNameIdx === -1 || urlsIdx === -1) {
            throw new Error('Geçersiz dosya formatı. Lütfen "Issues Overview" raporunu yüklediğinizden emin olun.');
          }

          const dynamicIssues = [];

          // Parse rows
          for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            const cols = parseRow(lines[i]);
            if (cols.length <= Math.max(issueNameIdx, urlsIdx)) continue;

            const issueName = cols[issueNameIdx].trim().replace(/^"|"$/g, '');
            const count = parseInt(cols[urlsIdx].trim().replace(/^"|"$/g, '') || '0', 10);
            
            if (count > 0 && issueName) {
              const desc = descIdx !== -1 && cols[descIdx] ? cols[descIdx].trim().replace(/^"|"$/g, '') : undefined;
              const fix = fixIdx !== -1 && cols[fixIdx] ? cols[fixIdx].trim().replace(/^"|"$/g, '') : undefined;
              const issueType = typeIdx !== -1 && cols[typeIdx] ? cols[typeIdx].trim().replace(/^"|"$/g, '').toLowerCase() : '';
              
              let status = 'warning';
              if (issueType.includes('error') || issueType.includes('issue')) status = 'error';
              if (issueType.includes('opportunity')) status = 'success';

              dynamicIssues.push({
                id: `sf-issue-${i}`,
                name: issueName,
                value: count,
                status,
                description: desc || '',
                howToFix: fix || ''
              });
            }
          }

          const result = {
            totalUrls: 0,
            dynamicIssues
          };

          resolve(result);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(new Error("Dosya okuma hatası"));
      reader.readAsText(file);
    });
  }
}
