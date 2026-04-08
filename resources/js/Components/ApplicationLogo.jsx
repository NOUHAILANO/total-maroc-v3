export default function ApplicationLogo({ className, ...props }) {
    return (
        <img 
            {...props} 
            src="/images/logo.png" 
            alt="" 
            // 'h-12' hiya l-kbourya l-i9tiradiya, t9dri t-beddliha mlli t-3eyti l-Component
            className={`h-12 w-auto object-contain ${className}`} 
        />
    );
}