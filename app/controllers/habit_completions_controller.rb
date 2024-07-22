class HabitCompletionsController < ApplicationController
  def create
    @habit = Habit.find(params[:habit_id])
    @completion = @habit.habit_completions.build(date: params[:date])
    
    if @completion.save
      render json: { success: true }
    else
      render json: { success: false, error: @completion.errors.full_messages.join(", ") }, status: :unprocessable_entity
    end
  end

  def destroy
    @completion = HabitCompletion.find(params[:id])
    @completion.destroy
    redirect_to habits_path, notice: 'Habit completion removed.'
  end
end
