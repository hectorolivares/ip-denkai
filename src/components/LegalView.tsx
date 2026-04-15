import { useNavigate } from "react-router-dom";

export function LegalView() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-20 text-left font-mono text-xs leading-relaxed opacity-70">
      <button 
        onClick={() => navigate("/")}
        className="mb-12 hover:text-[var(--text-h)] transition-colors cursor-pointer block"
      >
        [ VOLVER ]
      </button>

      <section className="mb-12">
        <div className="text-[var(--text-h)] font-bold mb-4"># LICENCIA MIT</div>
        <p className="whitespace-pre-wrap">
{`Copyright (c) 2026 Héctor Olivares

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
        </p>
      </section>

      <section className="mb-12">
        <div className="text-[var(--text-h)] font-bold mb-4"># STACK</div>
        <p>
          React 18 / TypeScript / Tailwind CSS / Geist Mono / IPInfo API
        </p>
      </section>

      <section className="mb-12">
        <div className="text-[var(--text-h)] font-bold mb-4"># CONTACTO</div>
        <p>
          GitHub: https://github.com/hectorolivares<br />
          Email: hector@ejemplo.com
        </p>
      </section>

      <div className="mt-20 opacity-20 text-[10px]">
        EOF_LEGAL_NOTICE
      </div>
    </div>
  );
}
