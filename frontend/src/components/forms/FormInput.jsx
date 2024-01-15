export default function FormInput({name, label, placeholder, ...rest}) {
   return (<div className="flex flex-col-reverse">
      <input
         id={name}
         name={name}
         className="font-body bg-transparent rounded border-2  dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary w-full text-lg outline-none p-1  dark:text-white peer transition"
         placeholder={placeholder}
         {...rest}
      />
      <label
         className="font-body font-semibold  dark:text-dark-subtle text-light-subtle dark:peer-focus:text-white peer-focus:text-primary transition self-start"
         htmlFor={name}
      >
         {label}
      </label>
   </div>)
}