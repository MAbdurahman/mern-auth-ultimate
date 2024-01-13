export default function FormInput({ name, label, placeholder, ...rest }) {
   return (
      <div className="flex flex-col-reverse">
         <input
            id={name}
            name={name}
            className="font-body bg-transparent rounded border-2 border-dark-subtle focus:border-white w-full text-lg outline-none p-1 text-white peer transition"
            placeholder={placeholder}
            {...rest}
         />
         <label
            className="font-body font-semibold text-dark-subtle peer-focus:text-white transition self-start"
            htmlFor={name}
         >
            {label}
         </label>
      </div>
   )
}