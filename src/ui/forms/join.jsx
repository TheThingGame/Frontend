import {forwardRef} from "react";
import {useForm} from "react-hook-form";
import {join} from "@/services";
import {errors as exceptions} from "@/utils";
import {useNavigate} from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import {useLobby} from "@/contexts/lobby/lobbyContext";
import {INITIAL_PLAYER} from "@/contexts/lobby/actions/playerActions";
import {INITIAL_LOBBY} from "@/contexts/lobby/actions/lobbyActions";

const JoinMatch = forwardRef((props, ref) => {
  const {lobbyDispatch, playerDispatch} = useLobby();
  const {data, loading, error, fetchData} = useFetch();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const {data: responseData, error: responseError} = await fetchData(() => join(formData));

    if (responseError || !ref || !ref.current) return;

    ref.current.close();

    const player = {
      player_id: responseData.player_id,
      player_name: formData.player_name,
    };
    delete responseData.player_id;

    lobbyDispatch({type: INITIAL_LOBBY, payload: responseData});
    playerDispatch({type: INITIAL_PLAYER, payload: player});

    navigate(`/lobby/${responseData.code}`);
  };

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <img className='mx-auto h-20 w-auto' src='/logo.svg.png' alt='Uno logo' />
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Join match</h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        {error && (
          <div className=' bg-error p-[1rem] mb-5 rounded-md text-textError '>Error: {exceptions[error.detail]}</div>
        )}
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor='player_name' className='block text-sm font-medium leading-6 text-gray-900'>
              Player name
            </label>
            <div className='mt-2'>
              <input
                id='player_name'
                name='player_name'
                type='text'
                autoComplete='off'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                {...register("player_name", {
                  required: "Player name is required",
                })}
              />
              {errors.player_name && (
                <p className='text-sm text-textError' role='alert'>
                  {errors.player_name.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label htmlFor='code' className='block text-sm font-medium leading-6 text-gray-900'>
                Code
              </label>
            </div>
            <div className='mt-2'>
              <input
                id='code'
                name='code'
                type='text'
                autoComplete='off'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                {...register("code", {required: "Code is required"})}
              />
              {errors.code && (
                <p className='text-sm text-textError' role='alert'>
                  {errors.code.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
              Join
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});
export default JoinMatch;
