# frozen_string_literal: true

module Bootstrap
  module Text
    class BaseComponent < ApplicationComponent
      def add_classes
        super
        @classes += " text-#{@options[:color]}" if @options[:color]
      end
    end
  end
end
