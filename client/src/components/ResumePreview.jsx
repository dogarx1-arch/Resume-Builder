import React from 'react';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import MinimalImageTemplate from './templates/MinimalImageTemplate';
import ClassicTemplate from './templates/ClassicTemplate';

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
    const renderTemplate = () => {
        switch (template) {
            case "modern": return <ModernTemplate data={data} accentColor={accentColor} />;
            case "minimal": return <MinimalTemplate data={data} accentColor={accentColor} />;
            case "minimal-image": return <MinimalImageTemplate data={data} accentColor={accentColor} />;
            case "classic": return <ClassicTemplate data={data} accentColor={accentColor} />;
            default: return <ModernTemplate data={data} accentColor={accentColor} />;
        }
    }

    return (
        <div className='w-full bg-gray-100'>
            <div id="resume-preview" className={"border border-gray-200 print:shadow-none print:border-none " + classes}>
                {renderTemplate()}
            </div>
            <style>{`
                @page { size: A4; margin: 0; }
                @media print {
                  html, body { margin: 0; padding: 0; background: white !important; }
                  body > *:not(#resume-print-root) { display: none !important; }
                  #resume-preview {
                    position: fixed; top: 0; left: 0; width: 100%; height: auto;
                    margin: 0 !important; padding: 0 !important; border: none !important;
                    box-shadow: none !important; background: white !important;
                  }
                }
            `}</style>
        </div>
    )
}

export default ResumePreview;