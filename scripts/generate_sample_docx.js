const JSZip = require('jszip');
const fs = require('fs');

function escapeXml(s){ return String(s===null||s===undefined?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

async function buildDocx({type, cols, colWidths, rows, filename}){
    const zip = new JSZip();
    const contentTypes = `<?xml version="1.0" encoding="UTF-8"?>\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">\n    <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>\n    <Default Extension="xml" ContentType="application/xml"/>\n    <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>\n</Types>`;
    zip.file('[Content_Types].xml', contentTypes);
    const rels = `<?xml version="1.0" encoding="UTF-8"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n    <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="/word/document.xml"/>\n</Relationships>`;
    zip.folder('_rels').file('.rels', rels);
    zip.folder('word').folder('_rels').file('document.xml.rels', `<?xml version="1.0" encoding="UTF-8"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>`);

    const makeCell = (text, width) => `<w:tc><w:tcPr><w:tcW w:w="${width}" w:type="dxa"/></w:tcPr><w:p xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:pPr><w:jc w:val="left"/></w:pPr><w:r><w:t>${escapeXml(text)}</w:t></w:r></w:p></w:tc>`;
    const makeHeaderCell = (text, width) => `<w:tc><w:tcPr><w:tcW w:w="${width}" w:type="dxa"/><w:shd w:val="clear" w:fill="D9E1F2"/></w:tcPr><w:p xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/></w:rPr><w:t>${escapeXml(text)}</w:t></w:r></w:p></w:tc>`;

    const th = cols.map((c,i)=> makeHeaderCell(c, colWidths[i] || 2400)).join('');
    const trs = rows.map(r=>{
        const cells = cols.map(k => r[k]||'');
        return `<w:tr>${cells.map((c,i)=>makeCell(c, colWidths[i]||2400)).join('')}</w:tr>`;
    }).join('');

    const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">\n  <w:body>\n    <w:p><w:r><w:t>${escapeXml(type === 'student' ? 'Student Report' : 'Faculty Report')}</w:t></w:r></w:p>\n    <w:tbl>\n      <w:tblPr>\n        <w:tblStyle w:val="TableGrid"/>\n        <w:tblBorders>\n          <w:top w:val="single" w:sz="4" w:space="0" w:color="000000"/>\n          <w:left w:val="single" w:sz="4" w:space="0" w:color="000000"/>\n          <w:bottom w:val="single" w:sz="4" w:space="0" w:color="000000"/>\n          <w:right w:val="single" w:sz="4" w:space="0" w:color="000000"/>\n          <w:insideH w:val="single" w:sz="4" w:space="0" w:color="000000"/>\n          <w:insideV w:val="single" w:sz="4" w:space="0" w:color="000000"/>\n        </w:tblBorders>\n      </w:tblPr>\n      <w:tblGrid>\n        ${colWidths.map(w=>`<w:gridCol w:w="${w}"/>`).join('')}\n      </w:tblGrid>\n      <w:tr>${th}</w:tr>\n      ${trs}\n    </w:tbl>\n    <w:sectPr/>\n  </w:body>\n</w:document>`;

    zip.folder('word').file('document.xml', documentXml);
    const buf = await zip.generateAsync({type:'nodebuffer'});
    fs.writeFileSync(filename, buf);
    console.log('Wrote', filename);
}

async function main(){
    // Student sample
    const studentCols = ['Student ID','Name','Sex','Department','Course','Academic Year','Year Level','Status'];
    const studentWidths = [1800,6000,1200,3600,3600,2400,1800,1800];
    const studentRows = [
        {'Student ID':'3','Name':'so p hia','Sex':'Female','Department':'BSN','Course':'Bachelor of Science in Nursing','Academic Year':'2024-2025','Year Level':'2nd Year','Status':'active'},
        {'Student ID':'5','Name':'Derry Cagadas Sagusay','Sex':'Male','Department':'Information Technology','Course':'BSCS','Academic Year':'2024-2025','Year Level':'1st','Status':'active'},
        {'Student ID':'6','Name':'dsadass dasdasd','Sex':'Male','Department':'CSP','Course':'Bachelor of Science in Nursing','Academic Year':'2024-2025','Year Level':'3rd Year','Status':'active'}
    ];
    await buildDocx({type:'student', cols:studentCols, colWidths:studentWidths, rows:studentRows, filename:'student_results_sample.docx'});

    // Faculty sample
    const facultyCols = ['Faculty ID','Name','Sex','Department','Position'];
    const facultyWidths = [1800,6000,1200,3600,3000];
    const facultyRows = [
        {'Faculty ID':'F001','Name':'Dr. John Smith','Sex':'Male','Department':'Computer Science','Position':'Professor'},
        {'Faculty ID':'F002','Name':'Anna Maria','Sex':'Female','Department':'Mathematics','Position':'Instructor'}
    ];
    await buildDocx({type:'faculty', cols:facultyCols, colWidths:facultyWidths, rows:facultyRows, filename:'faculty_results_sample.docx'});
}

main().catch(err=>{ console.error(err); process.exit(1); });
