const fs = require('fs');
const path = require('path');

// Paths
const configPath = path.join(__dirname, 'assets/js/config.js');
const indexPath = path.join(__dirname, 'index.html');
const robotsPath = path.join(__dirname, 'robots.txt');
const sitemapPath = path.join(__dirname, 'sitemap.xml');

console.log('Iniciando sincronização de SEO a partir do config.js...');

// Read config.js
const configContent = fs.readFileSync(configPath, 'utf8');

// Extract config using simulated context
let siteConfig = {};
try {
  const window = {};
  eval(configContent);
  siteConfig = window.siteConfig;
} catch (e) {
  console.error('Erro ao ler o config.js. Verifique se há algum erro de sintaxe no arquivo.', e);
  process.exit(1);
}

const dominio = siteConfig.dominio ? siteConfig.dominio.replace(/\/$/, '') : 'https://wpstelecom.com';
const logoPath = siteConfig.logo || 'assets/img/logo_wps.png';
const logoUrl = dominio + '/' + logoPath;
const empresa = siteConfig.empresa || '';
const descricao = siteConfig.descricao || '';
const keywords = siteConfig.keywords || '';

// 1. Update index.html
if (fs.existsSync(indexPath)) {
  let htmlContent = fs.readFileSync(indexPath, 'utf8');

  // Metatags
  htmlContent = htmlContent.replace(/(<meta\s+name="author"\s+content=")[^"]*(")/i, `$1${empresa}$2`);
  htmlContent = htmlContent.replace(/(<meta\s+name="description"\s+content=")[^"]*(")/i, `$1${descricao}$2`);
  htmlContent = htmlContent.replace(/(<meta\s+name="keywords"\s+content=")[^"]*(")/i, `$1${keywords}$2`);

  // Open Graph
  htmlContent = htmlContent.replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/i, `$1${empresa} - Provedor de Internet$2`);
  htmlContent = htmlContent.replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/i, `$1${descricao}$2`);
  htmlContent = htmlContent.replace(/(<meta\s+property="og:image"\s+content=")[^"]*(")/i, `$1${logoUrl}$2`);
  htmlContent = htmlContent.replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/i, `$1${dominio}/$2`);

  // Canonical
  htmlContent = htmlContent.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/i, `$1${dominio}/$2`);

  // JSON-LD Schema
  const jsonLdRegex = /(<script\s+type="application\/ld\+json">\s*)([\s\S]*?)(\s*<\/script>)/i;
  const match = htmlContent.match(jsonLdRegex);
  if (match) {
    try {
      const schema = JSON.parse(match[2]);
      schema.name = empresa;
      schema.image = logoUrl;
      schema['@id'] = `${dominio}/`;
      schema.url = `${dominio}/`;
      if (siteConfig.whatsapp) schema.telephone = `+${siteConfig.whatsapp}`;
      if (siteConfig.endereco) {
          // Assume the full address is the street for local business schema
          schema.address.streetAddress = siteConfig.endereco;
      }
      
      htmlContent = htmlContent.replace(jsonLdRegex, `$1${JSON.stringify(schema, null, 4)}$3`);
    } catch (e) {
      console.error('Erro ao atualizar o JSON-LD no index.html:', e);
    }
  }

  // Update image alt tags
  htmlContent = htmlContent.replace(/(<img\s+[^>]*id="logo-empresa"[^>]*>)/i, (imgMatch) => {
      return imgMatch.replace(/src="[^"]*"/, `src="${logoPath}"`).replace(/alt="[^"]*"/, `alt="${empresa} Logo"`);
  });
  htmlContent = htmlContent.replace(/(<img\s+[^>]*id="logo-footer"[^>]*>)/i, (imgMatch) => {
      return imgMatch.replace(/src="[^"]*"/, `src="${logoPath}"`).replace(/alt="[^"]*"/, `alt="${empresa} Logo"`);
  });

  fs.writeFileSync(indexPath, htmlContent, 'utf8');
  console.log('✅ index.html atualizado com sucesso!');
}

// 2. Update sitemap.xml
if (fs.existsSync(sitemapPath)) {
  let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  sitemapContent = sitemapContent.replace(/(<loc>)[^<]*(<\/loc>)/i, `$1${dominio}/$2`);
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
  console.log('✅ sitemap.xml atualizado com sucesso!');
}

// 3. Update robots.txt
if (fs.existsSync(robotsPath)) {
  let robotsContent = fs.readFileSync(robotsPath, 'utf8');
  robotsContent = robotsContent.replace(/(Sitemap:\s*).*(\n|$)/i, `$1${dominio}/sitemap.xml$2`);
  fs.writeFileSync(robotsPath, robotsContent, 'utf8');
  console.log('✅ robots.txt atualizado com sucesso!');
}

console.log('\n🚀 Sincronização concluída! Todos os arquivos refletem as informações do config.js.');
