# frozen_string_literal: true

module Bootstrap
  module Layouts
    class ColumnComponent < ApplicationComponent
      def initialize(id: 'column', breakpoints: {}, offsets: {}, options: {})
        @id = id
        @breakpoints = breakpoints
        @offsets = offsets
        @content = content
        @options = options
        add_classes
      end

      def add_classes
        super
        @classes += ' col'
        add_breakpoints
        add_offsets
      end

      def add_breakpoints
        @breakpoints.each do |breakpoint, columns|
          @classes += breakpoint.to_s == 'xs' ? " col-#{columns}" : " col-#{breakpoint}-#{columns}"
        end
      end

      def add_offsets
        @offsets.each do |breakpoint, columns|
          @classes += breakpoint.to_s == 'xs' ? " offset-#{columns}" : " offset-#{breakpoint}-#{columns}"
        end
      end
    end
  end
end
