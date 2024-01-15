export default function SubmitButton({value}) {
   return (<input
         type="submit"
         className="w-full rounded uppercase font-bold  dark:bg-white bg-secondary dark:text-secondary text-white hover:bg-opacity-90 transition text-lg cursor-pointer p-2"
         value={value}
      />);
};