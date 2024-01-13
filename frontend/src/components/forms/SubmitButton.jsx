export default function SubmitButton({value}) {
   return (
      <input
         type="submit"
         className="w-full rounded bg-white uppercase font-bold text-secondary hover:bg-opacity-90 transition text-lg cursor-pointer p-2"
         value={value}
      />
   );
};