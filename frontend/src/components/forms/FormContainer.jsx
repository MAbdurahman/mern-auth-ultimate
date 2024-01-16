export default function FormContainer({children}) {
   return (
      <div className="fixed inset-0 dark:bg-primary bg-gray-300 -z-10 flex justify-center items-center">
         {children}
      </div>
   )
}