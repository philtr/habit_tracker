class CalendarsController < ApplicationController
  def show
    @date = params[:date] ? Date.parse(params[:date]) : Date.today
    start_date = @date.beginning_of_month.beginning_of_week(:sunday)
    end_date = @date.end_of_month.end_of_week(:sunday)

    @calendar_data = (start_date..end_date).each_with_object({}) do |date, hash|
      hash[date] = HabitCompletion.includes(:habit).where(date: date)
    end

    @habits = Habit.all # For the modal select
  end
end
